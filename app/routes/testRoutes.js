import express from "express";
import {
  delayResponse,
  randomError,
  slowResponse,
  largeResponse,
  streamResponse,
  multiMessage
} from "../controllers/testchatController.js";

const router = express.Router();

router.post("/test/delay", delayResponse);
router.post("/test/error", randomError);
router.post("/test/slow", slowResponse);
router.post("/test/large", largeResponse);
router.post("/test/stream", streamResponse);
router.post("/test/multi", multiMessage);

export default router;