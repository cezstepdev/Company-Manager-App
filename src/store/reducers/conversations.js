import axios from "axios";

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
                let timeNow = new Date().toLocaleDateString("en-US") + ' ' + new Date().toLocaleTimeString();

                newState.selectedConversation.messages.unshift(
                    {
                        imageUrl: null,
                        imageAlt: null,
                        message: action.message,
                        createdAt: timeNow,
                        isMyMessage: true
                    },
                );

                let data = {
                    "conversationId": state.selectedConversation.id,
                    "sender": state.selectedConversation.sender,
                    "recipient": state.selectedConversation.recipient,
                    "message": action.message
                };


                axios.post("http://localhost:8080/api/v1/message", data, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM0NjQ4MjgzLCJleHAiOjE2MzU4MDc2MDB9.kAJQbH-vmVjIZxj8Y2ucnp5oWaiMaYfNZsebO5WMJf8'
                    }
                }).then(r => {
                    console.log(r);
                });
                return newState;
            }
            return state;
        }
        default:
            return state;
    }
}

export default conversationsReducer;