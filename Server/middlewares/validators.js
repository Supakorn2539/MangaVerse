const Joi = require('joi')
const createError = require('../utils/createError')


const registerSchema = Joi.object({
    email : Joi
    .string()
    .email({tlds : false})
    .required()
    .messages({
        "string.empty" : "Email is required"
    }),
    password: Joi
        .string()
        .required()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .messages({
            "string.empty": "password is required",
            "string.pattern.base": "password must contain a-z, A-Z, 0-9 and length between 6 and 30"
        }),
    confirmPassword: Joi
        .string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            "any.only": "password does not match",
            "string.empty": "confirm password is required"
        }),
    username : Joi
    .string()
    .required()
    .messages({
        "string.empty" : "Fill your username"
    }),
    firstName : Joi
    .string()
    .required()
    .messages({
        "string.empty" : "Fill you firstName"
    }),
    lastName : Joi
    .string()
    .required()
    .messages({
        "string.empty" : "Fill your lastName"
    })
})

const loginSchema = Joi.object({
    email: Joi
        .string()
        .email({ tlds: false })
        .required()
        .trim()
        .messages({
            "string.empty": "email is required"
        }),
    password: Joi
        .string()
        .required()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .messages({
            "string.empty": "password is required",
            "string.pattern.base": "password must contain a-z, A-Z, 0-9 and length between 6 and 30"
        })
})

const validateSchema = (schema) => (req, res, next) => {
    const {value, error} = schema.validate(req.body)

    if(error){
        return createError(400, error.details[0].message)
    }
    req.input = value
    next()
}


exports.registerValidator = validateSchema(registerSchema)
exports.loginValidator = validateSchema(loginSchema)