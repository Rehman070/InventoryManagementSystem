using InventoryManagementSystem.DataContext;
using InventoryManagementSystem.DTOs;
using InventoryManagementSystem.Entities;
using InventoryManagementSystem.Services.SaleService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISaleService _saleService;

        public SalesController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        #region Sale Apis
        [HttpGet("GetSales")]
            public async Task<IActionResult> GetSales()
            {
                var sales = await _saleService.GetSales();

                if (sales == null || !sales.Any())
                {
                    return NotFound("No sales found.");
                }

                return Ok(sales);
            }

        [HttpGet("GetSale")]
        public async Task<IActionResult> GetSale(int id)
        {
            var sale = await _saleService.GetSale(id);

            if (sale == null)
            {
                return NotFound($"Sale with ID {id} not found.");
            }

            return Ok(sale);
        }

        [HttpPost("AddSale")]
        public async Task<IActionResult> AddSale([FromBody] SaleCreateDto saleDto)
        {
            if (saleDto == null)
            {
                return BadRequest("Invalid sale data.");
            }

            var sale = await _saleService.AddSale(saleDto);

            if (sale == null)
            {
                return BadRequest("Sale could not be completed. Check product stock.");
            }

        return Ok(sale);
        }
        #endregion
    }
}
