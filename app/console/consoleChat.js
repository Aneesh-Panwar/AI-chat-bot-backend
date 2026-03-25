
import readline from "readline";
import { chatCore } from "../services/chatCore.js";
import { streamLLM } from "../services/llmClient.js";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function run() {
  rl.question("You: ", async (input) => {

    if (input === "exit") {
      rl.close();
      return;
    }

    const reply = await chatCore(input);

    console.log("Bot:", reply);

    run();
  });
}

run();