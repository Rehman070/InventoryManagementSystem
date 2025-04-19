using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;

namespace InventoryManagementSystem.Services.PurchaseService
{
    public interface IPurchaseService
    {
        public Task<IEnumerable<Purchase?>> GetPurchases();
        public Task<Purchase?> GetPurchase(int id);
        public Task<Purchase?> AddPurchase(PurchaseCreateDto purchaseDto);
    }
}
