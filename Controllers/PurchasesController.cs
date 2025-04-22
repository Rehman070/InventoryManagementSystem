using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using InventoryManagementSystem.Services.PurchaseService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly IPurchaseService _purchaseService;

        public PurchasesController(IPurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        #region Purchase Apis
        [HttpGet("GetPurchases")]
        public async Task<IActionResult> GetPurchases()
        {
            var purchases = await _purchaseService.GetPurchases();

            if (purchases == null || !purchases.Any())
            {
                return NotFound("No purchases found.");
            }

            return Ok(purchases);
        }

        [HttpGet("GetPurchase")]
        public async Task<IActionResult> GetPurchase(int id)
        {
            var purchase = await _purchaseService.GetPurchase(id);

            if (purchase == null)
            {
                return NotFound($"Purchase with ID {id} not found.");
            }

            return Ok(purchase);
        }

        [HttpPost("AddPurchase")]
        public async Task<IActionResult> AddPurchase([FromBody] PurchaseCreateDto purchaseDto)
        {
            if (purchaseDto == null)
            {
                return BadRequest("Invalid purchase data.");
            }

            var purchase = await _purchaseService.AddPurchase(purchaseDto);

            if (purchase == null)
            {
                return StatusCode(500, "Failed to add purchase.");
            }

            return Ok(purchase);
        }
        #endregion
    }
}
