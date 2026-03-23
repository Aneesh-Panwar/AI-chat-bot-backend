import { normalize } from "../logic/normalize.js";
import { detectIntent } from "../logic/intent.js";
import { getRelevantSections } from "../logic/retriever.js";

import { SECTIONS } from "../data/sections.js";
import { OVERVIEW } from "../data/overview.js";
import { SYSTEM_PROMPT } from "../prompts/prompts.js";
import { chooseModel } from "../services/modelRouter.js"

import { client } from "./llmClient.js";

let messages = [
  { role: "system", content: SYSTEM_PROMPT }
];


export async function chatCore(userInput) {

  const cleanText = normalize(userInput);
  const sections = getRelevantSections(cleanText, SECTIONS);
  const intent = detectIntent(cleanText);
  
  if (sections.length > 0) {
    messages.push({
      role: "system",
      content: `Relevant college information:\n${sections.join("\n")}`
    });
  }
  else if (intent === "GENERAL") {
    messages.push({
      role: "system",
      content: OVERVIEW
    });
  }
  
  messages.push({ role: "user", content: userInput });
  
  const model = chooseModel(
    intent,
    getRelevantSections.length
  );


  // const reply = await genereteLLMResponse({model,messages});

  // messages.push({
  //   role: "assistant",
  //   content: reply
  // });

  if (messages.length > 8) {
    messages.splice(1, messages.length - 8);
  }

  // return reply;
  return `OpenAI SDK  →  Hugging Face Router  →  Groq (actual model)

The OpenAI SDK is just a client library:

It formats requests

It parses responses

It does NOT decide where requests go

You changed this line:

baseURL: \"https://router.huggingface.co/v1\"`
}

export async function genereteLLMResponse({model,messages}){

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.5,
    max_tokens: 150
  });

  return response.choices[0].message.content;
}