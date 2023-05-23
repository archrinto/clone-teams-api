import Response from "../../Response.js";
import User from "../../models/User.js"

export default async (req, res) => {
    const user = await User.findById(req.user?.id);
    if (!user) {
        return Response.notFound(res);
    }
    return Response.success(res, user);
}