let lastSection = [];

const FOLLOWUPS = [
  "ok",
  "okay",
  "go on",
  "continue",
  "yes",
  "yeah",
  "tell me more",
  "more"
];

export function resolveFollowup(sections,cleanInput){

    const  isFollowup = FOLLOWUPS.includes(cleanInput);

    if(isFollowup && lastSection.length > 0){
        return lastSection;
    }

    if (sections.length > 0){
        lastSection = sections;
    }

    return sections;
}