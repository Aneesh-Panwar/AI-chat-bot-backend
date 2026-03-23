import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);
app.use("/api", testRoutes);

export default app;