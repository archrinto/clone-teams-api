import bcrypt from 'bcrypt';
import User from "../../models/User.js";
import Response from '../../Response.js';

export default async (req, res) => {
    const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 15)
    });

    if (!user) return Response.badRequest(res);

    return Response.success(res, user);
}