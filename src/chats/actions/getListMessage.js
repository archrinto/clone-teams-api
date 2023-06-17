import Response from "../../utils/Response.js";
import ChatMessage from "../../models/ChatMessage.js"

export default async (req, res) => {
    const limit = req?.query?.limit || 10;
    const skip = req.query?.skip || 0;

    const messages = await ChatMessage.find({ 'chat._id': req.params.chatId })
                    .sort({ createdAt: 'desc' })
                    .limit(limit)
                    .skip(skip);

    return Response.success(res, messages);
}