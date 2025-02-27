import XlsxPopulate from "xlsx-populate"
import path from 'path'
import Company from "../company/company.model.js"
import fs from 'fs'

export const generateReport = async(req, res) =>{
    try {
        const companies = await Company.find()

        const reportSheet = await XlsxPopulate.fromBlankAsync()
        
        companies.forEach((company, rowIndex) => {
            reportSheet.sheet(0).cell(rowIndex + 2, 1).value(company.name)
            reportSheet.sheet(0).cell(rowIndex + 2, 2).value(company.impact)
            reportSheet.sheet(0).cell(rowIndex + 2, 3).value(company.experienceYears)
            reportSheet.sheet(0).cell(rowIndex + 2, 4).value(company.category ? company.category.name : "N/A")
            reportSheet.sheet(0).cell(rowIndex + 2, 5).value(company.description)
            reportSheet.sheet(0).cell(rowIndex + 2, 6).value(company.phone)
        })

        
        reportSheet.sheet(0).cell("A1").value("Name")
        reportSheet.sheet(0).cell("B1").value("Impact")
        reportSheet.sheet(0).cell("C1").value("Experience")
        reportSheet.sheet(0).cell("D1").value("Category")
        reportSheet.sheet(0).cell("E1").value("Description")



        const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
        const fileName = `reporte-${timestamp}.xlsx`

        if (!fs.existsSync('./reports')) {
            fs.mkdirSync('./reports', { recursive: true })
        }

        reportSheet.toFileAsync(path.join('./reports', fileName))

        return res.status(200).send(
            {
                success: true,  
                message: "report generated in the 'reports' folder"
            }
        )
        
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with generating report function'
            }
        )
    }
}