export default (io, event, chat, participants) => {
    for (let i = 0; i < participants.length; i++) {
        const roomId = participants[i].userId.toString();
        const participantChat = { ...chat.toObject() }

        // remove current participat user before sent it
        const indexOfparticipant = participantChat.participants.findIndex(item => item._id.toString() === participants[i].userId.toString());
        participantChat.participants.splice(indexOfparticipant, 1);

       io.to(roomId).emit(event, participantChat);
    }
}