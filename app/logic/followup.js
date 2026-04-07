
const conversationState = {
    lastSection: [],
    suggestedSections: [],
    awaitingClarification: false,
};

const FOLLOWUPS = [
  "ok",
  "ok...",
  "and",
  "okay",
  "what about",
  "go on",
  "this",
  "that",
  "how",
  "when",
  "continue",
  "yes",
  "yeah",
  "tell me more",
  "more"
];


function isFollowupQuery(input){

    const tokens = input.split(" ");
    
    return(
        FOLLOWUPS.includes(input) ||
        FOLLOWUPS.includes(tokens[0])
    );
}


export function handleConversation(sections,cleanInput){

    
    if(sections.length > 0){
        
        conversationState.lastSection = sections;
        conversationState.suggestedSections = [];
        conversationState.awaitingClarification = false;
        
        return {
            sections,
            action: "PROCEED"
        }
    }
    
    const isFollowup = isFollowupQuery(cleanInput);

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