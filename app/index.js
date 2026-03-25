import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const mode = "console";

if (mode === "console") {
  console.log("Running in CONSOLE mode");
  import("./console/consoleChat.js");
} 
// else {
//   console.log("Running in API mode");
//   import("./startServer.js");
// }