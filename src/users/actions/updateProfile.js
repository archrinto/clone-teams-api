import Response from "../../Response.js";
import User from "../../models/User.js";

export default async (req, res) => {
    const updated = await User.updateOne({_id: req.user?.id}, req.body);
    const user = await User.findById(req.user?.id);

    return Response.success(res, user);
}