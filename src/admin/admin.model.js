import { model, Schema, version } from "mongoose";

const adminModel = Schema(
    {
        username:{
            type: String,
            require: [true, 'Name is required'],
            maxLength: [25, `Name can't exceed 25 characters`]
        },
        email:{
            type: String,
            require: [true, 'Email is required'],
            unique: true
        },
        password:{
            type: String,
            require: [true, 'Password is required'],
            maxLength: [100]
        }
    },
    {
        versionKey: false,
        timeStamps: true
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Admin', adminModel)