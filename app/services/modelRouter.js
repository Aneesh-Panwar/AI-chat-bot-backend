import { MODELS } from "../config/models.js";

export function chooseModel(intent, gotRelevantSection) {

  const mode = process.env.MODEL_MODE;

  if (mode === "fast") return MODELS.FAST;
  if (mode === "smart") return MODELS.SMART;

  // complex reasoning
  if (intent === "GENERAL") {
    return MODELS.SMART;
  }

  // small context questions
  if (gotRelevantSection) {
    return MODELS.FAST;
  }

  return MODELS.SMART;
}