import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js";
import ChatMessage from "../../models/ChatMessage.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";
import ChatType from "../../models/enums/ChatType.js";
import ParticipantStatus from "../../models/enums/ParticipantStatus.js";

export default async (req, res) => {
    const chat = await Chat.findById(req.params.chatId);

    // check if chat exist
    if (!chat) {
        return Response.notFound(res, {}, 'Chat not found');
    }

    const participants = await ChatParticipant.find({ chatId: req.params?.chatId });
    
    // check if user in participant
    const participantIndex = participants.findIndex(item => item.userId.toString() === req.user.id);
    if (participantIndex === -1) {
        return Response.unauthorized(res, {}, 'User does not have access to this chat');
    }

    // check if chat type is single and user already left the message
    // set to active again to send new message
    if (chat.chatType === ChatType.single) {
        for (let i = 0; i < participants.length; i++) {
            if (participants[i].status === ParticipantStatus.LEFT) {
                participants[i].status = ParticipantStatus.ACTIVE;
                participants[i].joinAt = new Date();
                participants[i].save();
                chat.participantCount += 1;
                
                // emit new chat
                const roomId = participants[i].userId.toString();
                req.app.io.to(roomId).emit(EventType.NEW_CHAT, {
                    ...chat.toObject(),
                    messages: []
                });
            }
        }
    }

    // check reply message
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

    // update last chat
    chat.messages = [message];
    chat.save();

    // send to active participants
    for (let i = 0; i < participants.length; i++) {
        if (!participants[i].status || participants[i].status === ParticipantStatus.ACTIVE){
            const roomId = participants[i].userId.toString();
            req.app?.io.to(roomId).emit(EventType.NEW_MESSAGE, message);
        }
        
    }

    return Response.success(res, message);
}