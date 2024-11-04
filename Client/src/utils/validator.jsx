import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required"
  }),
  
  password: Joi.string()
    .required()
    .pattern(/^[\w!@#%^&*]{6,30}$/) // Allowing special characters
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must contain a-z, A-Z, 0-9 and be between 6 and 30 characters"
    }),
    
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm password is required"
    }),
    
  username: Joi.string().required().messages({
    "string.empty": "Username is required"
  }),
  
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required"
  }),
  
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required"
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().trim().messages({
    "string.empty": "Email is required"
  }),
  
  password: Joi.string()
    .required()
    .pattern(/^[\w!@#%^&*]{6,30}$/) // Allowing special characters here too
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must contain a-z, A-Z, 0-9 and be between 6 and 30 characters"
    })
});

export function validateRegister(form) {
  const { error } = registerSchema.validate(form, { abortEarly: false });
  
  if (error) {
    const formattedErrors = error.details.reduce((acc, { path, message }) => {
      acc[path[0]] = message;  // path[0] holds the field name
      return acc;
    }, {});
    return formattedErrors;
  }
  
  return null;
}

export function validateLogin(form) {
  const { error } = loginSchema.validate(form, { abortEarly: false });
  
  if (error) {
    const formattedErrors = error.details.reduce((acc, { path, message }) => {
      acc[path[0]] = message;  // path[0] holds the field name
      return acc;
    }, {});
    return formattedErrors;
  }
  
  return null;
}
