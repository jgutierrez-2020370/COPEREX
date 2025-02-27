import Category from "./category.model.js"

export const createCategory = async (req, res) => {
    try {
        const data = req.body
        const category = new Category(data)
        const saveCategory = await category.save()

        res.status(201).send(
            {
                success: true,
                message: 'Category created successfully',
                data: saveCategory
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error creating category',
                err
            }
        )
        
    }
}

export const getCategories = async(req, res)=>{
    try {

        const { limit = 20, skip = 0 } = req.query
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)

        if(categories.length === 0) return res.status(404).send(
            {
                success: false,
                message: 'Categories not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Categories found: ', 
                categories,
                total: categories.length
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}