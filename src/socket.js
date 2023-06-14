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
        socket.user = user;

        return next();
    });

    io.on('connection', (socket) => {
        console.log('client connected');
        socket.join(socket.userId);
        
        socket.on('disconnect', () => {
            console.log('client disconnected');
        });
        
        socket.on('join-meeting', ({ roomId }) => {
            console.log('user join a meeting', roomId, socket.userId);
            socket.join(roomId);
            socket.to(roomId).emit('user-join-meeting', {
                userId: socket.userId,
                user: socket.user
            });
        });

        socket.on('leave-meeting', ({ roomId }) => {
            console.log('user leave a meeting', roomId, socket.userId)
            socket.to(roomId).emit('user-leave-meeting', {
                userId: socket.userId
            });
            socket.leave(roomId);
        });

        socket.on('send-peer-signal', ({ targetId, signal }) => {
            console.log('user send peer signal to', targetId, 'from', socket.userId);
            socket.to(targetId).emit('user-send-peer-signal', {
                userId: socket.userId,
                signal: signal,
                user: socket.user
            })
        });

        socket.on('return-peer-signal', ({ targetId, signal }) => {
            console.log('user return peer signal to', targetId, 'from', socket.userId);
            socket.to(targetId).emit('user-return-peer-signal', {
                userId: socket.userId,
                signal: signal
            })
        })

        socket.on('media-state-change', ({ roomId, mediaState }) => {
            console.log('user media state change', roomId, socket.userId, mediaState);
            socket.to(roomId).emit('user-media-state-change', {
                userId: socket.userId,
                mediaState: mediaState
            })
        })

    });

    return io;
}