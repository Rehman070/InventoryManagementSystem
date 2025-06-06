﻿using DocumentFormat.OpenXml.Wordprocessing;
using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GetProductsDto<Product>> GetProducts(int pageNumber = 1, int pageSize = 10)
        {
            var products = await _context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalProducts = await _context.Products.CountAsync();

            return new GetProductsDto<Product>
            {
                Data = products,
                TotalRecords = totalProducts,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<Product?> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
        public async Task<Product?> UpdateProduct(int id, ProductUpdateDto productDto)
        {
            var existingProduct = await _context.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return null; 
            }

            // Update the product properties
            existingProduct.Name = productDto.Name;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;
            existingProduct.Quantity = productDto.Quantity;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return existingProduct;
        }
        public async Task<Product?> AddProduct(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;
            
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
