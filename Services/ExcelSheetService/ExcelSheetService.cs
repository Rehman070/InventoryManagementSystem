using ClosedXML.Excel;
using InventoryManagementSystem.DataContext;
using Microsoft.EntityFrameworkCore;
using System;

namespace InventoryManagementSystem.Services.ExcelSheetService
{
    public class ExcelSheetService : IExcelSheetService
    {
        private readonly ApplicationDbContext _context;

        public ExcelSheetService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<byte[]> ExportProductsToExcel()
        {
            var products = await _context.Products.ToListAsync();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Products");

                // Add headers
                worksheet.Cell(1, 1).Value = "ID";
                worksheet.Cell(1, 2).Value = "Name";
                worksheet.Cell(1, 3).Value = "Price";
                worksheet.Cell(1, 4).Value = "Quantity";

                // Add product data
                int row = 2;
                foreach (var product in products)
                {
                    worksheet.Cell(row, 1).Value = product.Id;
                    worksheet.Cell(row, 2).Value = product.Name;
                    worksheet.Cell(row, 3).Value = product.Price;
                    worksheet.Cell(row, 4).Value = product.Quantity;
                    row++;
                }

                // Auto-fit columns
                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();
                }
            }
        }
    }
}
