import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { generateReport } from "./xlsx.controller.js";

const api = Router()

api.get(
    '/',
    [
        validateJwt
    ],
    generateReport
)

export default api