import bcrypt from 'bcrypt';
import User from "../../models/User.js";
import Response from "../../utils/Response.js";

export default async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 15)
    });

    if (!user) return Response.badRequest(res);

    return Response.success(res, user);
}