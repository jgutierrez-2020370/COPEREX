import Category from "../src/category/category.model.js"

export const existCategory = async(name)=>{
    const alreadyCategory = await Category.findOne({name})
    if(alreadyCategory){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}