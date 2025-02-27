import XlsxPopulate from "xlsx-populate"

export const generateReport = async(req, res) =>{
    try {
        const reportSheet = await XlsxPopulate.fromBlankAsync()
        reportSheet.sheet(0).cell("A1").value("Name")
        reportSheet.sheet(0).cell("B1").value("Impact")
        reportSheet.sheet(0).cell("C1").value("Experience")
        reportSheet.sheet(0).cell("D1").value("Category")
        reportSheet.sheet(0).cell("E1").value("Description")
        reportSheet.toFileAsync("./reporte.xlsx")
        
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