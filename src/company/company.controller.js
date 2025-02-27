import Category from '../category/category.model.js'
import Company from './company.model.js'

export const createCompany = async (req, res) => {
    try {
        const { category, ...data } = req.body

        const categoryExists = await Category.findById(category)

        if (!categoryExists) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        const company = new Company(
            {
                ...data,
                category: categoryExists._id
            }
        )
        
        await company.save()

        return res.send(
            {
                success: true,  
                message: 'Company created',
                company
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with creating company function'
            }
        )        
    }
}

export const updateCompany = async(req, res) => {
    try {
        const { id } = req.params
        const { category, ...data } = req.body

        const companyExists = await Company.findById(id)
        const categoryExists = await Category.findById(category)
        
        if(!companyExists) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Company not found"
                }
            )
        }

        if (category) {
            const categoryData = await Category.findById( category )
            

            if (!categoryData) {
                return res.status(400).send(
                    {
                        success: false,
                        message: "Category not found"
                    }
                )
            }

            data.category = [categoryData._id]
        }

        const updateController = await Company.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        return res.send(
            {
                success: true,
                message: 'Company updated successfully',
                updateController
            }
        )


    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with updating company function'
            }
        )
    }
}
