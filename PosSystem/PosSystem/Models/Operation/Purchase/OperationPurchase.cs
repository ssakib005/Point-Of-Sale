using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PosSystem.Models.Operation.Expense;

namespace PosSystem.Models.Operation.Purchase
{
    public class OperationPurchase
    {
        public int Id { get; set; }
        public string Branch { get; set; }
        public string Employee { get; set; }
        public DateTime DateTime { get; set; }
        public string Supplier { get; set; }
        public string Remarkes { get; set; }    
        public double TotalAmount { get; set; }
        public double PaidAmount { get; set; }
        public string PurchaseCode { get; set; }    
        public double DueAmount { get; set; }
        public List<PurchaseDetails> PurchaseDetails { get; set; }  
    }
}