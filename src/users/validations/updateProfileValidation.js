import Joi from "joi"
import joiValidationOptions from "../../utils/joiValidationOptions.js";
import Response from "../../utils/Response.js";

export default (req, res, next) => {
    const rules = {
        name: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6)
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