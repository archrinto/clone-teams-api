import Response from "../../Response.js";
import Chat from "../../models/Chat.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import ChatType from "../../models/enums/ChatType.js"

export default async (req, res) => {
    const chat = await Chat.create({
        owner: req.user?.id,
        name: req.body?.name || null,
        type: req.body?.type || ChatType.single,
        avatar: req.body?.avatar || null
    });

    const participants = req.body?.participants?.map((item) => { return { user: item, chat: chat._id } }) || [];

    if (participants.length > 0) {
        participants.push({
            user: req.user?.id,
            chat: chat._id,
            is_admin: true
        });
    }

    const added = await ChatParticipant.insertMany(participants);
    const addedIds = added?.map((item) => item._id) || [];

    chat.participants = addedIds;
    await chat.save();

    return Response.success(res, chat);
}