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
    public class PurchasesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PurchasesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
        {
            return await _context.Purchases.Include(p => p.Product).ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(int id)
        {
            var purchase = await _context.Purchases.Include(p => p.Product).FirstOrDefaultAsync(p => p.Id == id);

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        // POST: api/Purchases
        [HttpPost]
        public async Task<ActionResult<Purchase>> PostPurchase([FromBody] PurchaseCreateDto purchaseDto)
        {
            var product = await _context.Products.FindAsync(purchaseDto.ProductId);
            if (product == null)
            {
                return BadRequest("Product not found");
            }

            // Update product quantity
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

            return CreatedAtAction("GetPurchase", new { id = purchase.Id }, purchase);
        }
    }
}
