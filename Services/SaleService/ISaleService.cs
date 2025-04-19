using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;

namespace InventoryManagementSystem.Services.SaleService
{
    public interface ISaleService
    {
        public Task<IEnumerable<Sale>> GetSales();
        public Task<Sale?> GetSale(int id);
        public Task<Sale?> AddSale(SaleCreateDto saleDto);

    }
}
