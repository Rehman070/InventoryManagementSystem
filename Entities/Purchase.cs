namespace InventoryManagementSystem.Entities
{
    public class Purchase
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int QuantityPurchased { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;
        public string Supplier { get; set; }
        public Product? Product { get; set; } // Navigation property to Product entity
    }
}
