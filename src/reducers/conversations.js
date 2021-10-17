const initialState = {
    conversations: [],
    selectedConversation: {}
};

initialState.selectedConversation = initialState.conversations[0];

const conversationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONVERSATIONS_LOADED': {
            const newState = { ...state };
            newState.conversations = action.payload.conversations ? action.payload.conversations : [];
            newState.selectedConversation = action.payload.selectedConversation;

            return newState;
        }

        case 'SELECTED_CONVERSATION_CHANGED': {
            const newState = {...state};
            newState.selectedConversation =
                newState.conversations.find(
                    conversation => conversation.id === action.conversationId
                );

            return newState;
        }
        case 'NEW_MESSAGE_ADDED': {
            if (state.selectedConversation) {
                const newState = {...state};
                newState.selectedConversation = {...newState.selectedConversation};

                newState.selectedConversation.messages.unshift(
                    {
                        imageUrl: null,
                        imageAlt: null,
                        messageText: action.message,
                        createdAt: 'Apr 16',
                        isMyMessage: true
                    },
                );
                return newState;
            }
            return state;
        }
        default:
            return state;
    }
}

export default conversationsReducer;