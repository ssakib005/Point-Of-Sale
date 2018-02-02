using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Mvc;

namespace PosSystem.Models.Setup
{
    public class ExpenseItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string ExpenseCategoryName { get; set; } 
        public long CategoryId { get; set; }
        public ExpenseCategory Category { get; set; }

    }
}