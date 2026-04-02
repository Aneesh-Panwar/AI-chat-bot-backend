import { normalize } from "../logic/normalize.js";
import { detectIntent } from "../logic/intent.js";
import { getRelevantSections } from "../logic/retriever.js";
import { SECTIONS } from "../data/sections.js";
import { OVERVIEW } from "../data/overview.js";
import { SYSTEM_PROMPT } from "../prompts/prompts.js";
import { chooseModel } from "../services/modelRouter.js";
import { generateLLMResponse, streamLLM } from "./llmClient.js";

let messages = [
  { role: "system", content: SYSTEM_PROMPT }
];

export async function chatCore(userInput, options = {}) {
  const { onChunk, stream = false, signal } = options;

  let fullResponse = "";

  try {
    // Normalizing input
    const cleanText = normalize(userInput || "");

    // Detecting intent
    let intent = "UNKNOWN";
    intent = detectIntent(cleanText);


    // Retrieving RAG context 
    let sections = [];
    try {
      sections = getRelevantSections(cleanText, SECTIONS) || [];
    } catch (err) {
      console.warn("[Retriever Error]:", err.message);
    }

    // Removing old dynamic system context
    messages = messages.filter(msg => {
      return !(
        msg.role === "system" &&
        (
          msg.content.startsWith("Relevant college information") ||
          msg.content === OVERVIEW
        )
      );
    });

    // Injecting fresh context
    if (sections.length > 0) {
      messages.push({
        role: "system",
        content: `Relevant college information:\n${sections.join("\n")}`
      });
    } else if (intent === "GENERAL") {
      messages.push({
        role: "system",
        content: OVERVIEW
      });
    }

    // Message build (user input)
    messages.push({ role: "user", content: userInput });

    //Model selection
    let model;
    try {
      model = chooseModel(intent, sections.length);
    } catch (err) {
      console.warn("[Model Error]:", err.message);
      model = "default"; // fallback
    }

    // LLM response handling
    // console.log(process.env.DEVELOPMENT_MODE);

    if(process.env.DEVELOPMENT_MODE=="testing"){
      fullResponse = "hi there...just testing it.."
    }else{

      if (stream) {
        try {
          await streamLLM({ model, messages }, (chunk) => {
            fullResponse += chunk;
            if (onChunk) onChunk(chunk);
          },signal);
        } catch (err) {
          console.error("[Streaming Error]:", err.message);
          throw new Error("Streaming failed");
        }
      } else {
        try {
          fullResponse = await generateLLMResponse({ model, messages });
        } catch (err) {
          console.error("[LLM Error]:", err.message);
          throw new Error("LLM response failed");
        }
      }
    }

    // Message build (LLM response)
    messages.push({
      role: "assistant",
      content: fullResponse
    });

    // Trim message history
    const MAX = 8;
    if (messages.length > MAX) {
      messages = [
        messages[0], // keeps system prompt
        ...messages.slice(-(MAX - 1))
      ];
    }

    return fullResponse;

  } catch (err) {
    console.error("[chatCore Fatal Error]:", err.message);

    return "Something went wrong. Please try again.";
  }
}


function buildMessage(){
  return;
}


function RAG(){
  return;
}