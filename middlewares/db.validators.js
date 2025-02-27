import Category from "../src/category/category.model.js"
import Company from "../src/company/company.model.js"

export const existCategory = async(name)=>{
    const alreadyCategory = await Category.findOne({name})
    if(alreadyCategory){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const existCompany = async(name)=>{
    const alreadyCompany = await Company.findOne({name})
    if(alreadyCompany){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const impact = async(impact)=>{
    const validImpacts = ["alto", "medio", "bajo"];
    if (!validImpacts.includes(impact)){
        console.error(`impact must be valid | ${validImpacts}`)
        throw new Error(`impact must be valid | ${validImpacts}`)
    }
}