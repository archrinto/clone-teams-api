import Chat from "../../models/Chat.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";
import Response from "../../utils/Response.js";
import emitChatEventToParticipants from "../helpers/emitChatEventToParticipants.js";

export default async (req, res) => {
    // update chat data
    await Chat.updateOne(
        {  _id: req.params.chatId, },
        {
            name: req.body?.name,
            avatar: req.body?.avatar
        }
    );
    const chat = await Chat.findById(req.params.chatId);
    
    // get participants to sent update
    const participant = await ChatParticipant.find({ chatId: req.params.chatId });

    emitChatEventToParticipants(req.app?.io, EventType.CHAT_UPDATED, chat, participant);

    return Response.success(res, chat);
}