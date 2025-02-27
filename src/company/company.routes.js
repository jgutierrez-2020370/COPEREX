import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createCompany, updateCompany } from "./company.controller.js"

const api = Router()

api.post(
    '/',
    [
        validateJwt,
    ],
    createCompany
)

api.put(
    '/:id',
    [
        validateJwt
    ],
    updateCompany
)

export default api