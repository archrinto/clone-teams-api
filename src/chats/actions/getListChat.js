import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js";
import ChatParticipant from "../../models/ChatParticipant.js";
import ParticipantStatus from "../../models/enums/ParticipantStatus.js";

export default async (req, res) => {
    // load user participations
    const chatParticipated = await ChatParticipant.find(
        { userId: req.user.id, '$or': [{ status: ParticipantStatus.ACTIVE }, { status: { '$exists': false }}] }, 
        { chatId: 1}
    );

    // get list of chat ids 
    const chatIds = chatParticipated.map(item => item.chatId);
    // load the chats
    const chats = await Chat.find({ _id: { '$in': chatIds }}).sort({ updatedAt: -1 });

    // remove current user from participant list
    const isCurrentUser = (item) => item._id?.toString() == req.user.id

    const chatList = chats.map(item => {
        const indexOfCurrentUser = item.participants.findIndex(isCurrentUser);
        item.participants.splice(indexOfCurrentUser, 1);

        return item;
    })

    return Response.success(res, chatList);
}