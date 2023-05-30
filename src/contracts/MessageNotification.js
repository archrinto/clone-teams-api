const MessageNotification = {
    id: string,
    type: string,
    content: string,
    sender: {
        _id: string,
        name: string,
        avatar: string
    },
    chat: {
        _id: string,
        type: string,
        name: string,
        avatar: string
    },
    createdAt: string,
    updatedAt: string
}