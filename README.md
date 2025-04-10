Inventory Management System - Setup Guide
(ASP.NET Core 8 + Angular 16)

📌 Project Structure
InventoryManagementSystem/ (Backend)
│
├── InventorySystem.Client/ (Frontend)
│   ├── src/ (Angular code)
│   └── package.json
│
├── Controllers/
├── Data/
├── Models/
├── appsettings.json (DB config)
└── Program.cs

⚙️ Setup Steps
1️⃣ Clone & Open Project
git clone https://github.com/Rehman070/InventoryManagementSystem.git
cd InventoryManagementSystem

2️⃣ Backend Setup (.NET 8)
Configure Database
Edit appsettings.json:
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=InventoryDB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true"
}

Apply Migrations
In Visual Studio: open terminal or console and paste below command
Update-Database

Or via CLI:
dotnet ef database update

Run Backend
dotnet run or run manually 

➡️ API runs at: https://localhost:7246/swagger/index.html

3️⃣ Frontend Setup (Angular 16)
cd InventorySystem.Client
npm install
ng serve

➡️ App runs at: http://localhost:4200
