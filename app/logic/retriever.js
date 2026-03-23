import { KEYWORDS } from "./keywords.js";

function matches(text, words) {
  return words.some(word => text.includes(word));
}

export function getRelevantSections(text, sections) {
  const results = [];

  if (matches(text, KEYWORDS.location)) {
    results.push(sections.location);
  }
  if (matches(text, KEYWORDS.hostel)) {
    results.push(sections.hostel);
  }
  if (matches(text, KEYWORDS.fees)) {
    results.push(sections.fees);
  }
  if (matches(text, KEYWORDS.admission)) {
    results.push(sections.admissions);
  }
  if (matches(text, KEYWORDS.contact)) {
    results.push(sections.contact);
  }

  return results; 
}