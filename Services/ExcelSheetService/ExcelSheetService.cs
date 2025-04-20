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

                var headers = new List<string> { "ID", "Name", "Description", "Price", "Quantity", "CreatedAt", "UpdatedAt" };

                for (int i = 0; i < headers.Count; i++)
                {
                    worksheet.Cell(1, i + 1).Value = headers[i];
                }

                var headerRange = worksheet.Range(1, 1, 1, headers.Count);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;
                headerRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                // Add product data
                int row = 2;
                foreach (var product in products)
                {
                    worksheet.Cell(row, 1).Value = product.Id;
                    worksheet.Cell(row, 2).Value = product.Name;
                    worksheet.Cell(row, 3).Value = product.Description;
                    worksheet.Cell(row, 4).Value = product.Price;
                    worksheet.Cell(row, 5).Value = product.Quantity;
                    worksheet.Cell(row, 6).Value = product.CreatedAt.ToString("yyyy-MM-dd");
                    worksheet.Cell(row, 7).Value = product.UpdatedAt.ToString("yyyy-MM-dd");
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
