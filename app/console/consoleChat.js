import readline from "readline";
import { chatCore } from "../services/chatCore.js";

// Readline object for console I/O
const rl = readline.createInterface({
  input: process.stdin,
  output: null
});

let STREAM_MODE = false;

async function handleInput(input) {

  const cmd = input.trim().toLowerCase();
  

  // Response mode switching
  if (cmd === "/>stream") {
    STREAM_MODE = true;
    console.log("\n/> stream/> SWITCHED TO STREAM RESPONSE MODE\n");
    return;
  }

  if (cmd === "/>full") {
    STREAM_MODE = false;
    console.log("\n/> full/> SWITCHED TO FULL RESPONSE MODE\n");
    return;
  }

  process.stdout.write("\nBot: ");

  // Response mode determination
  try {
    if (STREAM_MODE) {
      await chatCore(input, {
        stream: true,
        onChunk: (chunk) => {
          // console.log(chunk);
          process.stdout.write(chunk);
        }
      });
      process.stdout.write("\n");
    } else {
      const reply = await chatCore(input);
      console.log(reply);
    }
  } catch (err) {
    console.log("\n[ERROR]:", err.message);
  }
}







console.log("Type 'exit' to quit\n");
process.stdout.write("\nYou: ");
// main function for console chat
rl.on("line", async (input) => {
  input = input.trim();
  if (input === "exit") {
    rl.close();
    return;
  }

  
  await handleInput(input);
  process.stdout.write("\nYou: ");
});
