import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js";
import ChatMessage from "../../models/ChatMessage.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";

export default async (req, res) => {
    const message = await ChatMessage.create({
        chat: {
            _id: req.params.chatId,
        },
        content: req.body?.content,
        messageType: req.body?.type,
        sender: {
            _id: req.user?.id || null,
            name: req.user?.name || null,
            avatar: req.user?.avatar || null,
        },
        replyTo: req.body?.replyTo || null
    });

    const updated = await Chat.updateOne({ _id: req.params.chatId }, { messages: [message]})
    console.log(updated);

    // send to recipients
    const participants = await ChatParticipant.find({ chatId: req.params?.chatId });
    for (let i = 0; i < participants.length; i++) {
        const roomId = participants[i].userId.toString();
        req.app?.io.to(roomId).emit(EventType.new_message, message);
    }

    return Response.success(res, message);
}