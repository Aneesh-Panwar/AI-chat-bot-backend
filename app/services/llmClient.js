import { OpenAI } from "openai";
import "dotenv/config";


export const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// Full response from LLM
export async function generateLLMResponse({model,messages}){

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.5,
    max_tokens: 150
  });

  return response.choices[0].message.content;
}


// Streaming response from LLM
export async function streamLLM({model,messages},onChunk) {
  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");

    for (let line of lines) {
      line = line.trim();

      if (!line.startsWith("data:")) continue;

      const data = line.replace("data:", "").trim();

      if (data === "[DONE]") return;

      try {
        const json = JSON.parse(data);

        const token = json.choices?.[0]?.delta?.content;

        if (token) {
          onChunk(token); 
        }

      } catch (e) {
        // ignore partial JSON
      }
    }

    buffer = "";
  }
}