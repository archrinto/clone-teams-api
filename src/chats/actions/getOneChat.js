import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js";

export default async (req, res) => {
    // load the chats
    const chat = await Chat.findOne({ _id: req.params.chatId });

    if (!chat) return Response.notFound(res, {});

    // remove current user from participant list
    const isCurrentUser = (item) => item._id?.toString() == req.user.id
    const indexOfCurrentUser = chat.participants.findIndex(isCurrentUser);
    
    chat.participants.splice(indexOfCurrentUser, 1);

    return Response.success(res, chat);
}