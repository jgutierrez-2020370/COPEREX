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

        const companyPopulate = await company.populate('category', 'name')
        

        return res.send(
            {
                success: true,  
                message: 'Company created',
                companyPopulate
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
        ).populate('category', 'name')

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

export const Filters = async(req, res) => {
    try {
        const filter = req.body.filter
        const valid = ["years","A-Z","Z-A"]

        console.log(filter);
        

        if (!valid.includes(filter)){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Please select a valid filter'
                }
            )
        }

        if(filter === 'years') {
            const years = req.body.years

            if(!years) {
                return res.status(500).send(
                    {
                        success: false,
                        message: "Please add 'years' whit the consult"
                    }
                )
            }
            
            const companyYears = await Company.find({ experienceYears: years })

            if(companyYears.length == 0){
                return res.stauts(404).send(
                    {
                        success: false,
                        message: "Any company with this experience years"
                    }
                )
            }

            return res.status(200).send(
                {
                    success: true,
                    message: "Companies found",
                    companyYears
                }
            )
        } else if (filter === 'A-Z'){
            const companies = await Company.find().sort({ name: 1 })
            return res.status(200).send(
                {
                    succes: true,
                    essage: 'Companies ordened ascendingly',
                    companies
                }
            )
        } else if (filter === 'Z-A'){
            const companies = await Company.find().sort({ name: -1 })
            return res.status(200).send(
                {
                    succes: true,
                    essage: 'Companies ordened descendingly',
                    companies
                }
            )
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with Filters function'
            }
        )
    }
}
