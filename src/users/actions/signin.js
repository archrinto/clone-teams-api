import passport from "passport"
import jwt from 'jsonwebtoken';

import config from "../../config.js";
import Response from "../../Response.js";
import User from "../../models/User.js";

export default async (req, res) => {
    const user = await User.findOne({email: req.body?.username });
    const passwordValid = await user?.isValidPassword(req.body?.password);

    if (!user || !passwordValid) {
        return Response.unauthorized(res, {}, 'Incorect email or password');
    }
    
    const token = jwt.sign({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name, 
        email: user.email,
    }, config.jwt_secret);

    return Response.success(res, {
        user: user,
        token: token
    });
}