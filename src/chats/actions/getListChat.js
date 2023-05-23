import Response from "../../Response.js";
import Chat from "../../models/Chat.js";
import ChatParticipant from "../../models/ChatParticipant.js";
import ChatType from "../../models/enums/ChatType.js";

export default async (req, res) => {
    const chats = await Chat.find();
    const chatIds = chats.map(item => item._id);
    const singelChatIds = chats.filter(item => item.type == ChatType.single).map(item => item._id);

    const participants = await ChatParticipant.find({ chat: { '$in': singelChatIds }, user: {'$ne': req.user?.id } }).populate('user');
    // const lastMessages = await 
    console.log(singelChatIds);

    const singelChatMap = {};

    for (let i=0; i < participants.length; i++) {
        singelChatMap[participants[i].chat] = participants[i];
    }
    
    const chatList = [];
    for (let i=0; i < chats.length; i++) {
        const lastMessage = null;
        const chat = {
            _id: chats[i]._id,
            name: chats[i].name,
            avatar: chats[i].avatar,
            last_message: lastMessage,
            user: null,
            updated_at: lastMessage?.created_at || chats[i].created_at,
        }

        if (chats[i].type == ChatType.single) {
            const participant = singelChatMap?.[chats[i]._id]?.user || null;

            chat.name = [participant?.first_name, participant?.last_name].join(' ') || null;
            chat.avatar = participant?.avatar || null;
            chat.user = participant;
        }

        chatList.push(chat);
    }

    return Response.success(res, chatList);
}