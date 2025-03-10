'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import categoryRoutes from '../src/category/category.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import xlsxRoutes from '../src/xlsx/xlsx.routes.js'

const configs = (app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(limiter)
    app.use(helmet())
    app.use(morgan('dev'))

}

const routes = (app)=> {
    app.use('/v1/Category', categoryRoutes)
    app.use('/v1/Admin', adminRoutes)
    app.use('/v1/Company', companyRoutes)
    app.use('/V1/Report', xlsxRoutes)
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}