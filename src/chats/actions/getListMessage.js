import Response from "../../Response.js";
import ChatMessage from "../../models/ChatMessage.js"

export default async (req, res) => {
    const messages = await ChatMessage.find({ chat: req.params?.chatId });

    return Response.success(res, messages);
}