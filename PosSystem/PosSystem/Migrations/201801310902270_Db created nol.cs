namespace PosSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Dbcreatednol : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Branches",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        OrgName = c.String(),
                        Code = c.String(nullable: false),
                        ContactNumber = c.String(),
                        Address = c.String(),
                        OrganizationId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Organizations", t => t.OrganizationId, cascadeDelete: true)
                .Index(t => t.OrganizationId);
            
            CreateTable(
                "dbo.Organizations",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        ContactNumber = c.String(),
                        Address = c.String(),
                        Image = c.Binary(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ItemCategories",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Category = c.String(),
                        CategoryName = c.String(),
                        Name = c.String(nullable: false),
                        Code = c.String(nullable: false),
                        Description = c.String(),
                        Image = c.Binary(),
                        RootId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ItemCategories", t => t.RootId)
                .Index(t => t.RootId);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        BranchId = c.Int(nullable: false),
                        BName = c.String(),
                        JoiningDate = c.DateTime(nullable: false),
                        Image = c.Binary(),
                        ContactNo = c.String(),
                        Email = c.String(),
                        EmpName = c.String(),
                        EmployeesId = c.Int(nullable: false),
                        EmergencyContactNo = c.String(),
                        Nid = c.String(),
                        FatherName = c.String(),
                        MotherName = c.String(),
                        PresentAddress = c.String(),
                        PermanentAddress = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ExpenseCategories",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Category = c.String(),
                        CategoryName = c.String(),
                        Name = c.String(nullable: false),
                        Code = c.String(nullable: false),
                        Description = c.String(),
                        ExpenseRootId = c.Long(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ExpenseCategories", t => t.ExpenseRootId)
                .Index(t => t.ExpenseRootId);
            
            CreateTable(
                "dbo.ExpenseItems",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        Description = c.String(),
                        ExpenseCategoryName = c.String(),
                        CategoryId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ExpenseCategories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.ExpenseDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        Description = c.String(),
                        Quantity = c.Double(nullable: false),
                        Amount = c.Double(nullable: false),
                        CategoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.OperationExpenses", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.OperationExpenses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Branch = c.String(),
                        Employee = c.String(),
                        DateTime = c.DateTime(nullable: false),
                        TotalAmount = c.Double(nullable: false),
                        PaidAmount = c.Double(nullable: false),
                        DueAmount = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        CtCode = c.String(),
                        ItCode = c.String(),
                        CatName = c.String(nullable: false),
                        Name = c.String(),
                        CostPrice = c.Double(nullable: false),
                        SellPrice = c.Double(nullable: false),
                        Code = c.String(),
                        Description = c.String(),
                        Image = c.Binary(),
                        CategoryId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ItemCategories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.OperationPurchases",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Branch = c.String(),
                        Employee = c.String(),
                        DateTime = c.DateTime(nullable: false),
                        Supplier = c.String(),
                        Remarkes = c.String(),
                        TotalAmount = c.Double(nullable: false),
                        PaidAmount = c.Double(nullable: false),
                        PurchaseCode = c.String(),
                        DueAmount = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PurchaseDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        Quantity = c.Double(nullable: false),
                        Amount = c.Double(nullable: false),
                        CategoryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.OperationPurchases", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.OperationSales",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Branch = c.String(),
                        Employee = c.String(),
                        SaleDate = c.DateTime(nullable: false),
                        CustomerNumber = c.String(),
                        CustomerName = c.String(),
                        TotalAmount = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SalesDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ItemName = c.String(),
                        Qty = c.Double(nullable: false),
                        Price = c.Double(nullable: false),
                        StockQty = c.Double(nullable: false),
                        SalesId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.OperationSales", t => t.SalesId, cascadeDelete: true)
                .Index(t => t.SalesId);
            
            CreateTable(
                "dbo.Parties",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        Email = c.String(),
                        ContactNumber = c.String(),
                        Address = c.String(),
                        Image = c.Binary(),
                        Customer = c.String(),
                        Supplier = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SalesDetails", "SalesId", "dbo.OperationSales");
            DropForeignKey("dbo.PurchaseDetails", "CategoryId", "dbo.OperationPurchases");
            DropForeignKey("dbo.Items", "CategoryId", "dbo.ItemCategories");
            DropForeignKey("dbo.ExpenseDetails", "CategoryId", "dbo.OperationExpenses");
            DropForeignKey("dbo.ExpenseItems", "CategoryId", "dbo.ExpenseCategories");
            DropForeignKey("dbo.ExpenseCategories", "ExpenseRootId", "dbo.ExpenseCategories");
            DropForeignKey("dbo.ItemCategories", "RootId", "dbo.ItemCategories");
            DropForeignKey("dbo.Branches", "OrganizationId", "dbo.Organizations");
            DropIndex("dbo.SalesDetails", new[] { "SalesId" });
            DropIndex("dbo.PurchaseDetails", new[] { "CategoryId" });
            DropIndex("dbo.Items", new[] { "CategoryId" });
            DropIndex("dbo.ExpenseDetails", new[] { "CategoryId" });
            DropIndex("dbo.ExpenseItems", new[] { "CategoryId" });
            DropIndex("dbo.ExpenseCategories", new[] { "ExpenseRootId" });
            DropIndex("dbo.ItemCategories", new[] { "RootId" });
            DropIndex("dbo.Branches", new[] { "OrganizationId" });
            DropTable("dbo.Parties");
            DropTable("dbo.SalesDetails");
            DropTable("dbo.OperationSales");
            DropTable("dbo.PurchaseDetails");
            DropTable("dbo.OperationPurchases");
            DropTable("dbo.Items");
            DropTable("dbo.OperationExpenses");
            DropTable("dbo.ExpenseDetails");
            DropTable("dbo.ExpenseItems");
            DropTable("dbo.ExpenseCategories");
            DropTable("dbo.Employees");
            DropTable("dbo.ItemCategories");
            DropTable("dbo.Organizations");
            DropTable("dbo.Branches");
        }
    }
}
