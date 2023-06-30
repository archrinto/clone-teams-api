import Response from "../../utils/Response.js";
import Chat from "../../models/Chat.js"
import ChatParticipant from "../../models/ChatParticipant.js";
import User from "../../models/User.js";
import ChatType from "../../models/enums/ChatType.js"
import EventType from "../../models/enums/EventType.js";
import emitChatEventToParticipants from "../helpers/emitChatEventToParticipants.js";

export default async (req, res) => {
    // add current user as participant
    req.body?.participants?.push(req.user.id);

    // need check if the user already have a chat with the participant
    if (!req.body?.chatType || req.body?.chatType == ChatType.single) {
        const chat = await Chat.findOne({
            chatType: ChatType.single,
            'participants._id': {
                '$all': [...req.body?.participants],
            }
        });

        if (chat) {
            return Response.success(res, chat);
        }
    }

    // load user of the participants
    const users = await User.find({ _id: { '$in': req.body?.participants }});

    if (users.length < 2) return Response.badRequest(res, {}, "Invalid Participant");

    // map users into embedded document format
    // only get 10 of them to reduce document size
    const participants = users.slice(0, 10).map(item => {
        return { 
            _id: item._id, 
            name: item.name, 
            avatar: item.avatar 
        };
    }) || [];

    // crate new chat
    const newchat = await Chat.create({
        ownerId: req.user?.id,
        name: req.body?.name || null,
        chatType: req.body?.chatType || ChatType.single,
        avatar: req.body?.avatar || null,
        participantCount: participants.length,
        participants: participants
    });

    // save all relation for chat and users
    const chatParticipants = users.map(item => {
        return {
            userId: item._id,
            chatId: newchat._id,
            joinAt: new Date()
        }
    });
    ChatParticipant.insertMany(chatParticipants);

    // send event to all participant
    emitChatEventToParticipants(req.app?.io, EventType.NEW_CHAT, newchat, chatParticipants);
    
    // remove current user from participant list
    const isCurrentUser = (item) => item._id?.toString() == req.user.id
    const indexOfCurrentUser = newchat.participants.findIndex(isCurrentUser);
    newchat.participants.splice(indexOfCurrentUser, 1);

    return Response.success(res, newchat);
}