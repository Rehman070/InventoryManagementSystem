using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace InventoryManagementSystem.Services.SaleService
{
    public class SaleService : ISaleService
    {
        private readonly ApplicationDbContext _context;

        public SaleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sale>> GetSales()
        {
            var sales = await _context.Sales.Include(s => s.Product).ToListAsync();
            return sales.Any() ? sales : null;
        }

        public async Task<Sale?> GetSale(int id)
        {
            return await _context.Sales.Include(s => s.Product).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Sale?> AddSale(SaleCreateDto saleDto)
        {
            var product = await _context.Products.FindAsync(saleDto.ProductId);

            if (product == null || product.Quantity < saleDto.QuantitySold)
            {
                return null;
            }

            // Update product quantity
            product.Quantity -= saleDto.QuantitySold;

            var sale = new Sale
            {
                ProductId = saleDto.ProductId,
                QuantitySold = saleDto.QuantitySold,
                TotalPrice = saleDto.QuantitySold * product.Price,
                SaleDate = DateTime.UtcNow
            };

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return sale;
        }
    }
}
