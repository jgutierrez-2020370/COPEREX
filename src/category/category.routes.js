import { Router } from "express";
import { getCategories, createCategory } from "./category.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { categoryValidator } from "../../middlewares/validators.js";

const api = Router()


api.get(
    '/',
    getCategories
)

api.post(
    '/',
    [
        validateJwt,
        categoryValidator
    ],
    createCategory
)

export default api