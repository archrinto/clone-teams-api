import Joi from "joi"
import joiValidationOptions from "../../utils/joiValidationOptions.js";
import Response from "../../utils/Response.js";

export default (req, res, next) => {
    const rules = {
        participants: Joi.array().items(Joi.string()).required().min(1),
    };

    const { error, value } = Joi.object(rules).validate(
        req.body, 
        joiValidationOptions
    );

    if (error) {
        const errors = error.details.map(e => e.message);
        return Response.badRequest(res, {}, "Validation Error", { errors })
    }

    req.body = value;

    next();
}