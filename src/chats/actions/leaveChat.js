import Chat from "../../models/Chat.js";
import ChatParticipant from "../../models/ChatParticipant.js";
import EventType from "../../models/enums/EventType.js";
import ParticipantStatus from "../../models/enums/ParticipantStatus.js";
import Response from "../../utils/Response.js";
import emitChatEventToParticipants from "../helpers/emitChatEventToParticipants.js";

export default async (req, res) => {
    const chatId = req.params.chatId || '';
    // check if the user is join the chat
    const participant = await ChatParticipant.findOne({ chatId, userId: req.user?.id });

    if (!participant) {
        return Response.badRequest(res, {}, 'User has not joined the chat');
    }

    // get current chat and update it
    const chat = await Chat.findById(chatId);

    if (!chat) {
        return Response.badRequest(res, {}, 'Chat not found');
    }

    const participantIndex = chat.participants.findIndex(item => item._id.toString() === req.user.id);

    if (participantIndex === -1) {
        return Response.badRequest(res, {}, 'This user not found in chat participant')
    }

    chat.participantCount -= 1;
    chat.participants[participantIndex].status = ParticipantStatus.LEFT;
    participant.status = ParticipantStatus.LEFT;
    participant.leaveAt = new Date();

    chat.save();
    participant.save();

    return Response.success(res);
}