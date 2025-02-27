import { Router } from "express"
import { loginValidator } from "../../middlewares/validators.js"
import { login } from "./admin.controller.js"

const api = Router()

api.post(
    '/Login',
    [loginValidator],
    login
)

export default api