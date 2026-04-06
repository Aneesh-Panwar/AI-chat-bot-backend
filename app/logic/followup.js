
const conversationState = {
    lastSection: [],
    suggestedSections: [],
    awaitingClarification: false,
};

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

export function handleConversation(sections,cleanInput){

    const  isFollowup = FOLLOWUPS.includes(cleanInput);

    if(sections.length > 0){

        conversationState.lastSection = sections;
        conversationState.suggestedSections = [];
        conversationState.awaitingClarification = false;

        return {
            sections,
            action: "PROCEED"
        }
    }

    if(isFollowup && conversationState.lastSection.length > 0){
        return {
            sections: conversationState.lastSection,
            action: "PROCEED"
        };
    }

    if(isFollowup && conversationState.suggestedSections.length > 0){
        return {
            sections: [],
            action: "CLARIFY",
            options: conversationState.suggestedSections
        }
    }

    return {
        sections: [],
        action: "SUGGEST",
    };
}