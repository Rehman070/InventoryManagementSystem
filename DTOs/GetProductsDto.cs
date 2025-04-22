using InventoryManagementSystem.Entities;

namespace InventoryManagementSystem.DTOs
{
    public class GetProductsDto<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int TotalRecords { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

    }
}
