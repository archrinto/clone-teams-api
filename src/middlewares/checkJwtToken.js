import jwt from 'jsonwebtoken';

import config from "../config.js";
import Response from '../Response.js';

export const validateToken = (token) => {
    try {
        const user = jwt.verify(token, config.jwt_secret)
        return user;
    } catch (err) {
        return null;
    }
}

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const user = validateToken(token);

        if (!user) {
            return Response.unauthorized(res);
        }

        req.user = user;
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            data: {}
        });
    }
};