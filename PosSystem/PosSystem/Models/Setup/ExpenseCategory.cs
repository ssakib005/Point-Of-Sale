using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PosSystem.Models.Setup
{
    public class ExpenseCategory
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public string CategoryName { get; set; } 
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public string Description { get; set; }
        public long? ExpenseRootId { get; set; }
        public ExpenseCategory ExpenseRoot { get; set; }
        public List<ExpenseCategory> ExpenseChild { get; set; }
        public List<ExpenseItem> ExpenseItems { get; set; } 
    }
}