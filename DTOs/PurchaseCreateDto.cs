namespace InventoryManagementSystem.DTOs
{
    public class PurchaseCreateDto
    {
        public int ProductId { get; set; }
        public int QuantityPurchased { get; set; }
        public string Supplier { get; set; }
    }
}
