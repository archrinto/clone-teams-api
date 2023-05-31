import Response from "../../utils/Response.js";
import User from "../../models/User.js";
import EventType from "../../models/enums/EventType.js";

export default async (req, res) => {
    const updated = await User.updateOne({_id: req.user?.id}, {
        profileStatus: req.body?.profileStatus || null
    });

    const user = await User.findById(req.user?.id);
    
    req.app?.io.emit(EventType.PROFILE_STATUS_CHANGE, {
        _id: user._id,
        profileStatus: user.profileStatus
    });

    return Response.success(res, user);
}