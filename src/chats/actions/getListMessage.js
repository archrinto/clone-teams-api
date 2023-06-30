import Response from "../../utils/Response.js";
import ChatMessage from "../../models/ChatMessage.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import ParticipantStatus from "../../models/enums/ParticipantStatus.js";

export default async (req, res) => {
    const limit = req?.query?.limit || 10;
    const skip = req.query?.skip || 0;
    const participant = await ChatParticipant.findOne({
        userId: req.user.id,
        chatId: req.params.chatId
    });

    if (!participant) {
        return Response.unauthorized(res, [], 'User does not have access to this chat');
    }

    if (participant.status && participant.status !== ParticipantStatus.ACTIVE) {
        return Response.success(res, []);
    }

    const filters = {
        'chat._id': req.params.chatId,
    };

    if (participant.joinAt) {
        filters['createdAt'] = {'$gte': participant.joinAt }
    }

    const messages = await ChatMessage.find(filters)
        .sort({ createdAt: 'desc' })
        .limit(limit)
        .skip(skip);

    return Response.success(res, messages);
}