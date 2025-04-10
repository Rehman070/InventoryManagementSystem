using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.Entities;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.SeedData
{
    public class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            context.Database.Migrate();

            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product { Name = "Laptop", Description = "High-performance laptop", Price = 1200, Quantity = 10 },
                new Product { Name = "Smartphone", Description = "Latest model smartphone", Price = 800, Quantity = 20 },
                new Product { Name = "Headphones", Description = "Noise-cancelling headphones", Price = 150, Quantity = 30 },
                new Product { Name = "Keyboard", Description = "Mechanical keyboard", Price = 100, Quantity = 15 },
                new Product { Name = "Mouse", Description = "Wireless mouse", Price = 50, Quantity = 25 },
                new Product { Name = "Monitor", Description = "27-inch LED monitor", Price = 300, Quantity = 12 },
                new Product { Name = "Printer", Description = "Color laser printer", Price = 250, Quantity = 8 },
                new Product { Name = "Router", Description = "High-speed Wi-Fi router", Price = 180, Quantity = 10 },
                new Product { Name = "External HDD", Description = "1TB External Hard Drive", Price = 120, Quantity = 20 },
                new Product { Name = "USB Flash Drive", Description = "128GB USB Drive", Price = 40, Quantity = 50 }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}