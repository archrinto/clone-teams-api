import { Server } from "socket.io";
import { validateToken } from "./middlewares/checkJwtToken.js";

export default (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3001"
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
    });

    return io;
}