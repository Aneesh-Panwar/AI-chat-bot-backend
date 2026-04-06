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
  if (matches(text, KEYWORDS.departments)) {
    results.push(sections.departments);
  }
  if (matches(text, KEYWORDS.placements)) {
    results.push(sections.placements);
  }
  if (matches(text, KEYWORDS.facilities)) {
    results.push(sections.facilities);
  }

  return results; 
}