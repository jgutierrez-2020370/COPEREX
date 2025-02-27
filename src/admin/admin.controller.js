import { checkPassword, encrypt } from "../../utils/encrypt.js"
import { generatejwt } from "../../utils/jwt.js"
import Admin from "./admin.model.js"

export const defaultAdmin = async(req, res) => {
    try {
        const defautlAdmin = await Admin.findOne({username: process.env.ADMIN_USER})

        if (!defautlAdmin) { 
            const newADmin = new Admin(
                {
                    username: process.env.ADMIN_USER,
                    email: process.env.ADMIN_EMAIL,
                    password: await encrypt(process.env.ADMIN_PASS)
                }
            )
            await newADmin.save()
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error whit default admin',
                err
            }
        )
    }
}

export const login = async (req, res) => {
    try {
        let { adminLoggin, password } = req.body 
        console.log(adminLoggin, password);
               
        let admin = await Admin.findOne(
            {
                $or: [
                    {username: adminLoggin},
                    {email: adminLoggin}
                ]
            }
        )
        
        if (admin && await checkPassword(admin.password, password)){
            let loggedAdmin = {
                uid: admin._id,
                username: admin.username,
            }

            let token = await generatejwt(loggedAdmin) 
            return res.send(
                {
                    success: true,
                    message: `Welcome ${admin.name}`,
                    loggedAdmin,
                    token
                }
            )
        }

        return res.status(400).send(
            {
                success: false,
                message: 'Wrong username or password'
            }
        ) 
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with login function'
            }
        )        
    }
}