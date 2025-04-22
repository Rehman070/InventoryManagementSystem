namespace InventoryManagementSystem.Services.ExcelSheetService
{
    public interface IExcelSheetService
    {
        Task<byte[]> ExportProductsToExcel();

    }
}
