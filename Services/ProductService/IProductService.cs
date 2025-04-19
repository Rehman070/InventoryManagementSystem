using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Services.ProductService
{
    public interface IProductService
    {
        public Task<IEnumerable<Product>> GetProducts();
        public Task<Product?> GetProductById(int id);
        public Task<Product?> UpdateProduct(int id, ProductUpdateDto productDto);
        public Task<Product?> AddProduct(Product product);
        public Task<bool> DeleteProduct(int id);
    }
}
