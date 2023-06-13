import Chat from "../../models/Chat.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import User from "../../models/User.js";
import ChatType from "../../models/enums/ChatType.js";
import EventType from "../../models/enums/EventType.js";
import Response from "../../utils/Response.js";
import emitChatEventToParticipants from "../helpers/emitChatEventToParticipants.js";

export default async (req, res) => {
    let userRequested = req.body?.participants || [];

    const chatId = req.params.chatId
    const chat = await Chat.findById(chatId);
    const participants = await ChatParticipant.find({ chatId: chatId });
    const participantUsersIds = participants.map(item => item.userId.toString());

    // validate participant request
    userRequested = userRequested.filter(item => !participantUsersIds.includes(item));

    if (userRequested.length === 0) {
        return Response.badRequest(res, {}, 'Invalid participants');
    }

    // prepare participant data
    const users = await User.find({ _id: { '$in': userRequested }});
    const userCount = users.length;
    const chatParticipantsData = users.map(item => {
        return {
            userId: item._id,
            chatId: chatId
        }
    });

    // save chat participants
    await ChatParticipant.insertMany(chatParticipantsData);

    // change participants count
    // add embedded participants
    chat.participantCount = participantUsersIds.length + users.length;
    if (chat.participantCount < 10) {
        chat.participants = [
            ...chat.participants,
            ...users.splice(0, 10 - chat.participantCount)
        ]
    }

    // need change type of the chat
    if (chat.chatType === ChatType.single && chat.participantCount > 2) {
        chat.chatType = ChatType.group;
    }

    await chat.save();

    emitChatEventToParticipants(req.app?.io, EventType.CHAT_UPDATED, chat, participants);
    emitChatEventToParticipants(req.app?.io, EventType.CHAT_UPDATED, chat, chatParticipantsData);

    // remove current user from participant list
    const isCurrentUser = (item) => item._id?.toString() == req.user.id
    const indexOfCurrentUser = chat.participants.findIndex(isCurrentUser);
    chat.participants.splice(indexOfCurrentUser, 1);

    return Response.success(res, chat);
}