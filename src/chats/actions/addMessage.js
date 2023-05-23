import Response from "../../Response.js";
import ChatMessage from "../../models/ChatMessage.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";

export default async (req, res) => {
    const message = await ChatMessage.create({
        chat: req.params?.chatId,
        content: req.body?.content,
        type: req.body?.type,
        sender: req.user?.id,
    });

    // send to recipients
    const participants = await ChatParticipant.find({ chat: req.params?.chatId });
    for (let i = 0; i < participants.length; i++) {
        const roomId = participants[i].user.toString();
        req.app?.io.to(roomId).emit(EventType.new_message, message);
    }

    return Response.success(res, message);
}