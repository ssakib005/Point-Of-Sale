using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using PosSystem.Models.Operation.Expense;

namespace PosSystem.Models.Operation.Purchase
{
    public class PurchaseDetails
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public double Quantity { get; set; }
        public double Amount { get; set; } 
        public double Total { get; set; }
        public int CategoryId { get; set; }
        public virtual OperationPurchase Category { get; set; }  
    }
}