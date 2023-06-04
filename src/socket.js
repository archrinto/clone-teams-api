import { Server } from "socket.io";
import { validateToken } from "./middlewares/checkJwtToken.js";

export default (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake?.headers?.authorization || socket.handshake?.auth?.token;
        const user = validateToken(token);
        if (!user) {
            return next(new Error("Unauthorized"));
        }
        socket.userId = user.id;

        return next();
    });

    io.on('connection', (socket) => {
        console.log('client connected');
        socket.join(socket.userId);
        
        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
        
        socket.on('join-meeting', (roomId) => {
            console.log('user join a meeting', roomId, socket.userId);
            socket.join(roomId);
            socket.to(roomId).emit('user-joined-meeting', socket.userId);
        });

        socket.on('leave-meeting', (roomId) => {
            socket.to(roomId).emit('user-leave-meeting', socket.userId);
            socket.leave(roomId);
        });
    });

    return io;
}