import Joi from "joi"
import joiValidationOptions from "../../utils/joiValidationOptions.js";
import Response from "../../utils/Response.js";

export default (req, res, next) => {
    const rules = {
        content: Joi.string().required().empty(''),
        messageType: Joi.string().required().empty(''),
        replyTo: Joi.object({
            _id: Joi.string().required(),
        }).empty(null)
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