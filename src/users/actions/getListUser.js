import Response from "../../utils/Response.js";
import User from "../../models/User.js"

export default async (req, res) => {
    const filters = {};
    const limit = req.query?.limit || 10;

    if (req.query?.search) {
        const search = { '$regex': '.*' + req.query.search + '.*', '$options' : 'i' };
        filters['$or'] = [
            { name: search },
            { email: search },
        ];
    }   
    
    const users = await User.find(filters).limit(limit);

    return Response.success(res, users);
}