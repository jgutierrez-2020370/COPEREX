import { Schema, model } from "mongoose";

const companySchema = Schema(
    {
        name:{
            type: String,
            require: [true, 'Name is required'],
            unique: true,
            maxLength: [25, `Category name can't exceed 25 characters`]
        },
        impact:{
            type: String,
            required: [true, 'impacto is required'],
            enum: ['alto', 'medio', 'bajo']
        },
        experienceYears:{
            type: Number,
            required: [true, 'experience years is required'],
            min: [1, 'experience years must be at least 1 year']
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        description:{
            type: String,
            required: [true, 'description is required'],
            maxLength: [100, 'description must not exceed 100 characters']
        },
        phone:{
            type: Number,
            required: [true, 'phone is required'],
            maxLength: [8, 'phone must be 8 characters']
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Company', companySchema)