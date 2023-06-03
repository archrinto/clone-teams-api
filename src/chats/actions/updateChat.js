import Chat from "../../models/Chat.js"
import Response from "../../utils/Response.js";

export default async (req, res) => {
    await Chat.updateOne(
        {  _id: req.params.chatId, },
        {
            name: req.body?.name,
            avatar: req.body?.avatar
        }
    );
    const chat = await Chat.findById(req.params.chatId);

    return Response.success(res, chat);
}