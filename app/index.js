import "dotenv/config";

const mode = process.env.CHAT_MODE;

if (mode === "console") {
  console.log("Running in CONSOLE mode");
  import("./console/consoleChat.js");
} 
else {
  console.log("Running in API mode");
  import("./startServer.js");
}