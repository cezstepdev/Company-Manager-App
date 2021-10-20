import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

let conversations = [
    { 
        id: '1',
        imageUrl: require('../../images/profiles/daryl.png').default,
        imageAlt: 'Daryl Duckmanton',
        title: 'Daryl Duckmanton',
        createdAt: 'Apr 16',
        latestMessageText: 'This is a message',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Ok then',
                createdAt: 'Apr 16',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    Yeah I think it's best we do that. Otherwise things won't work well at all. 
                    I'm adding more text here to test the sizing of the speech bubble and the 
                    wrapping of it too.
                `,
                createdAt: 'Apr 16',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Maybe we can use Jim\'s studio.',
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    All I know is where I live it's too hard
                    to record because of all the street noise.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: `
                    Well we need to work out sometime soon where
                    we really want to record our video course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                messageText: `
                    I'm just in the process of finishing off the
                    last pieces of material for the course.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'How\'s it going?',
                createdAt: 'Apr 13',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/daryl.png').default,
                imageAlt: 'Daryl Duckmanton',
                messageText: ' Hey mate what\'s up?',
                createdAt: 'Apr 13',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hey Daryl?',
                createdAt: 'Apr 13',
                isMyMessage: true
            }
        ]
    },
    {
        id: '2', 
        imageUrl: require('../../images/profiles/kim.jpeg').default,
        imageAlt: 'Kim O\'Neil',
        title: 'Kim O\'Neil',
        createdAt: 'Oct 20',
        latestMessageText: 'Ok fair enough. Well good talking to you.',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Ok fair enough. Well good talking to you.',
                createdAt: 'Oct 20',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    Not sure exactly yet. It will be next year sometime. Probably late.
                `,
                createdAt: 'Oct 20',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Yeah I know. But oh well. So when is the big date?',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    Well I know you like doing that stuff. But honestly I think
                    you are already really talented. It's a shame you haven't found
                    what you are looking for yet.
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: `
                    I'm doing ok. Just working on building some applications to
                    bulk up my resume, so I can get a better job.
                `,
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                messageText: `
                    I've just been really busy at work myself, looking to get
                    married sometime next year too. How are you going?
                `,
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Yes it has been a little while',
                createdAt: 'Oct 19',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/kim.jpeg').default,
                imageAlt: 'Kim O\'Neil',
                messageText: 'Hey!!!! Have not spoken to you for a while',
                createdAt: 'Oct 19',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi Kim?',
                createdAt: 'Oct 19',
                isMyMessage: true
            }
        ]
    },
    {
        id: '3', 
        imageUrl: require('../../images/profiles/john.jpeg').default,
        imageAlt: 'John Anderson',
        title: 'John Anderson',
        createdAt: '1 week ago',
        latestMessageText: 'Yes I love how Python does that',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '4',
        imageUrl: require('../../images/profiles/ben.png').default,
        imageAlt: 'Ben Smith',
        title: 'Ben Smith',
        createdAt: '2:49 PM',
        latestMessageText: 'Yeah Miami Heat are done',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '2:49',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '5',
        imageUrl: require('../../images/profiles/douglas.png').default,
        imageAlt: 'Douglas Johannasen',
        title: 'Douglas Johannasen',
        createdAt: '6:14 PM',
        latestMessageText: 'No it does not',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '6:14 PM',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '6',
        imageUrl: require('../../images/profiles/jacob.png').default,
        imageAlt: 'Jacob Manly',
        title: 'Jacob Manly',
        createdAt: '3 secs ago',
        latestMessageText: 'Just be very careful doing that',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '3 secs ago',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '7',
        imageUrl: require('../../images/profiles/stacey.jpeg').default,
        imageAlt: 'Stacey Wilson',
        title: 'Stacey Wilson',
        createdAt: '30 mins ago',
        latestMessageText: 'Awesome!!! Congratulations!!!!',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '30 mins ago',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '8',
        imageUrl: require('../../images/profiles/stan.jpeg').default,
        imageAlt: 'Stan George',
        title: 'Stan George',
        createdAt: '1 week ago',
        latestMessageText: 'Good job',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 week ago',
                isMyMessage: true
            }
        ]
    },
    { 
        id: '9',
        imageUrl: require('../../images/profiles/sarah.jpeg').default,
        imageAlt: 'Sarah Momes',
        title: 'Sarah Momes',
        createdAt: '1 year ago',
        latestMessageText: 'Thank you. I appreciate that.',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hi',
                createdAt: '1 year ago',
                isMyMessage: true
            }
        ]
    }
];

export const conversationsSaga = function*() {
    axios.get('http://localhost:8080/api/v1/conversation/czarek', {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZGFtIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InN0dWRlbnQ6d3JpdGUifSx7ImF1dGhvcml0eSI6InN0dWRlbnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoiY291cnNlOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6ImNvdXJzZTp3cml0ZSJ9XSwiaWF0IjoxNjM0NjQ4MjgzLCJleHAiOjE2MzU4MDc2MDB9.kAJQbH-vmVjIZxj8Y2ucnp5oWaiMaYfNZsebO5WMJf8'
        }
    }).then(
        res => {
            console.log(res.data);
            console.log(conversations);
            conversations = res.data;
        }
    );
    yield delay(1000);
    yield put({
        type: 'CONVERSATIONS_LOADED',
        payload: {
            conversations,
            selectedConversation: conversations[0]
        }
    });
}

export function* watchGetConversationsAsync() {
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}