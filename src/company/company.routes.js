import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createCompany, Filters, updateCompany } from "./company.controller.js"
import { companyValidator, filterValidator, updateCompanyValidator } from "../../middlewares/validators.js"


const api = Router()

api.post(
    '/',
    [
        validateJwt,
        companyValidator
    ],
    createCompany
)

api.get(
    '/',
    [
        validateJwt,
        filterValidator
    ],
    Filters
)

api.put(
    '/:id',
    [
        validateJwt,
        updateCompanyValidator
    ],
    updateCompany
)


export default api