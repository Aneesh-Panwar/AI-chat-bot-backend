export function detectIntent(text) {
  if(isOutOfScope(text)){
    return;
  }

  if (
    text.includes("about") ||
    text.includes("overview") ||
    text.includes("college") ||
    text.includes("gpd") ||
    text.includes("campus") 
  ) {
    return "GENERAL";
  }

  // everything else that passes scope
  return "QUERY";
}

function isOutOfScope(text) {
  const OUT_OF_SCOPE = [
    "weather",
    "movie",
    "politics",
    "cricket",
    "bitcoin",
    "ai",
    "chatgpt"
  ];

  return OUT_OF_SCOPE.some(w => text.includes(w));
}