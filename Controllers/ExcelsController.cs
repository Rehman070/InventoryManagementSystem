using InventoryManagementSystem.Services.ExcelSheetService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelsController : ControllerBase
    {
        private readonly IExcelSheetService _excelSheetService;

        public ExcelsController(IExcelSheetService excelSheetService)
        {
            _excelSheetService = excelSheetService;
        }

        #region Excel Sheet Apis
        [HttpGet("ExportProducts")]
        public async Task<IActionResult> ExportProducts()
        {
            var fileContent = await _excelSheetService.ExportProductsToExcel();

            if (fileContent == null || fileContent.Length == 0)
            {
                return NotFound("No products available to export.");
            }

            return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Products.xlsx");
        }
        #endregion
    }
}
