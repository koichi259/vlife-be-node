//Validation

const Joi = require('@hapi/joi');

//Register Validation
const loginValidation = (data: any) => {
    const schema = Joi.object({
        mail: Joi.string().min(6).required().email(),
        clave: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

//podemos ir agregando todos los schemas que vamos a validar
const registerValidation = (data: any) => {
    const schema = Joi.object({
        mail: Joi.string().min(6).required().email(),
        clave: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation; 