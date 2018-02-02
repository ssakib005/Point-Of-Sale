using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace PosSystem.Models.Operation.Expense
{
    public class ExpenseDetails
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public double Quantity { get; set; }
        public double Amount { get; set; }
        [NotMapped]
        public double Total { get; set; }
        public int CategoryId { get; set; }
        public virtual OperationExpense Category { get; set; }
    }
}