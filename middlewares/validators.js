import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existCategory, existCompany, impact } from "./db.validators.js";

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

export const companyValidator = [
    body('name', 'name cannot be empty').notEmpty().custom(existCompany),
    body('impact', 'impact cannot be empty').notEmpty().custom(impact),
    body('experienceYears', 'experienceYears cannot be empty').notEmpty(),
    body('category', 'category cannot be empty').notEmpty(),
    body('description', 'description cannot be empty').notEmpty(),
    body('phone', 'phone must be 8 characters').notEmpty().isLength({min: 8, max: 8}),
    validateErrors
]

export const updateCompanyValidator = [
    body('name', 'name cannot be empty').optional().custom(existCompany),
    body('impact', 'impact cannot be empty').optional().custom(impact),
    body('experienceYears', 'experienceYears cannot be empty').optional(),
    body('category', 'category cannot be empty').optional(),
    body('description', 'description cannot be empty').optional(),
    body('phone', 'phone must be 8 characters').optional().isLength({min: 8, max: 8}),
    validateErrors
]

export const filterValidator = [
    body('filter', 'filter is required').notEmpty(),
    validateErrors
]