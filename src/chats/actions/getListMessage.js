import Response from "../../utils/Response.js";
import ChatMessage from "../../models/ChatMessage.js"

export default async (req, res) => {
    const limit = 30;

    const messages = await ChatMessage.find({ 'chat._id': req.params.chatId })
                    .sort({ createdAt: 'desc' })
                    .limit(limit);

    return Response.success(res, messages);
}