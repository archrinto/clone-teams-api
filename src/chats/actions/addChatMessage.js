import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js";
import ChatMessage from "../../models/ChatMessage.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";

export default async (req, res) => {
    let replyTo = null;
    
    if (req.body?.replyTo?._id) {
        replyTo = await ChatMessage.findOne({
            _id: req.body.replyTo._id,
        });
    }

    const message = await ChatMessage.create({
        chat: {
            _id: req.params.chatId,
        },
        content: req.body?.content,
        messageType: req.body?.messageType,
        sender: {
            _id: req.user?.id || null,
            name: req.user?.name || null,
            avatar: req.user?.avatar || null,
        },
        replyTo: replyTo
    });

    const updated = await Chat.updateOne({ _id: req.params.chatId }, { messages: [message]})

    // send to recipients
    const participants = await ChatParticipant.find({ chatId: req.params?.chatId });
    for (let i = 0; i < participants.length; i++) {
        const roomId = participants[i].userId.toString();
        req.app?.io.to(roomId).emit(EventType.new_message, message);
    }

    return Response.success(res, message);
}