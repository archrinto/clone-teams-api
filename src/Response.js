export default {
    success(res, data={}, message="Ok") {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    },

    unauthorized(res, data={}, message="Unauthorized") {
        return res.status(401).json({
            success: false,
            message,
            data
        });
    },

    badRequest(res, data={}, message="Bad request") {
        return res.status(400).json({
            success: false,
            message,
            data
        });
    },

    badRequest(res, data={}, message="Forbidden") {
        return res.status(403).json({
            success: false,
            message,
            data
        });
    },


    notFound(res, data={}, message="Not found") {
        return res.status(404).json({
            success: false,
            message,
            data
        });
    },

    serverError(res, data={}, message="Something went wrong") {
        return res.status(500).json({
            success: false,
            message,
            data
        });
    },
}