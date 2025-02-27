import { Schema,  model} from "mongoose";

const categorySchema = Schema(
    {
        name:{
            type: String,
            require: [true, 'Name is required'],
            unique: true,
            maxLength: [25, `Category name can't exceed 25 characters`]
        }
    },
    {
        versionKey: false,
        timeStamps: true
    }
)

export default model('Category', categorySchema)