using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace InventoryManagementSystem.Services.PurchaseService
{
    public class PurchaseService : IPurchaseService
    {
        private readonly ApplicationDbContext _context;

        public PurchaseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Purchase?>> GetPurchases()
        {
            var purchases = await _context.Purchases
                .AsNoTracking()
                .Include(p => p.Product)
                .ToListAsync();
            return purchases;
        }

        public async Task<Purchase?> GetPurchase(int id)
        {
            return await _context.Purchases
                .Include(p => p.Product)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Purchase?> AddPurchase(PurchaseCreateDto purchaseDto)
        {
            var product = await _context.Products.FindAsync(purchaseDto.ProductId);

            if (product == null)
            {
                return null;
            }

            product.Quantity += purchaseDto.QuantityPurchased;

            var purchase = new Purchase
            {
                ProductId = purchaseDto.ProductId,
                QuantityPurchased = purchaseDto.QuantityPurchased,
                TotalPrice = purchaseDto.QuantityPurchased * product.Price,
                PurchaseDate = DateTime.UtcNow,
                Supplier = purchaseDto.Supplier
            };

            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            return purchase;
        }
    }
}
