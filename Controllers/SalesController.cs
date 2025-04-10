using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SalesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.Sales.Include(s => s.Product).FirstOrDefaultAsync(s => s.Id == id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale([FromBody] SaleCreateDto saleDto)
        {
            var product = await _context.Products.FindAsync(saleDto.ProductId);
            if (product == null)
            {
                return BadRequest("Product not found");
            }

            if (product.Quantity < saleDto.QuantitySold)
            {
                return BadRequest("Not enough stock available");
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

            return CreatedAtAction("GetSale", new { id = sale.Id }, sale);
        }
    }
}
