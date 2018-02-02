using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using PosSystem.Models.Operation.Expense;
using PosSystem.Models.Operation.Purchase;
using PosSystem.Models.Operation.Sales;
using PosSystem.Models.Setup;

namespace PosSystem.Models.DbFile
{
    public class PosDbContext : DbContext
    {
        public DbSet<ItemCategory> Categories { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Item> Items { get; set; } 
        public DbSet<Organization> Organizations { get; set; } 
        public DbSet<Branch> Branches { get; set; } 
        public DbSet<Party> Parties { get; set; } 
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; } 
        public DbSet<ExpenseItem> ExpenseItems { get; set; }
        public DbSet<OperationExpense> OperationExpenses { get; set; }
        public DbSet<ExpenseDetails> ExpenseDetails{ get; set; }
        public DbSet<OperationPurchase> OperationPurchases { get; set; }
        public DbSet<PurchaseDetails> PurchaseDetails { get; set; } 
        public DbSet<OperationSales> OperationSales { get; set; }
        public DbSet<SalesDetails> SalesDetails { get; set; }
    }
}