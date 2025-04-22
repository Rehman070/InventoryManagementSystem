using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementSystem.Services.ProductService
{
    public interface IProductService
    {
        public Task<GetProductsDto<Product>> GetProducts(int pageNumber = 1, int pageSize = 10);
        public Task<Product?> GetProduct(int id);
        public Task<Product?> UpdateProduct(int id, ProductUpdateDto productDto);
        public Task<Product?> AddProduct(Product product);
        public Task<bool> DeleteProduct(int id);
    }
}
