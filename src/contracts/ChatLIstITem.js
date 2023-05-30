const ChatListItem = {
    _id: string,
    name: string,
    avatar: string, // url
    type: string,
    messages: [
        {
            id: string,
            type: string,
            content: string,
            sender: {
                _id: string,
                name: string,
                avatar: string
            },
            createdAt: string,
            updatedAt: string
        }
    ],
    participantCount: number,
    participants: [
        {
            _id: string,
            name: string,
            avatar: string,
        },
        {
            _id: string,
            name: string,
            avatar: string,
        },
    ],
}

