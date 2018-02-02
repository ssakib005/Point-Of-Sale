using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PosSystem.Models.Operation.Expense
{
    public class OperationExpense 
    {
        public int Id { get; set; }
        public string Branch { get; set; }
        public string Employee { get; set; }
        public DateTime DateTime { get; set; }
        public double TotalAmount { get; set; }
        public double PaidAmount { get; set; }
        public double DueAmount { get; set; }
        public List<ExpenseDetails> ExpenseDetails { get; set; } 

    }
}