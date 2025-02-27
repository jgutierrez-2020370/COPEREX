import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existCategory } from "./db.validators.js";

export const loginValidator = [
    body('adminLoggin', 'Username or email cannot be empty')
        .notEmpty(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    validateErrors
]

export const categoryValidator = [
    body('name', 'name cannot be empty').notEmpty().custom(existCategory),
    validateErrors
]