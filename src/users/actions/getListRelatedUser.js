import ChatParticipant from "../../models/ChatParticipant.js"
import User from "../../models/User.js";
import Response from "../../utils/Response.js";

export default async (req, res) => {
    // get all converstaions of current user
    const chatIds = await ChatParticipant.distinct('chatId', { userId: req.user.id });
    // collect all user that have same conversation
    const userIds = await ChatParticipant.distinct('userId', { userId: { '$ne': req.user.id }, chatId: { '$in': chatIds }});
    // collect user data
    const users = await User.find({ _id: { '$in': userIds }}, { name: 1, profileStatus: 1 });

    return Response.success(res, users);
}