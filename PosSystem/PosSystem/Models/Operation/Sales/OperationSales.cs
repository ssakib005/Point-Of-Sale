using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PosSystem.Models.Operation.Sales
{
    public class OperationSales
    {
        public int Id { get; set; }
        public string Branch { get; set; }
        public string Employee { get; set; }
        public DateTime SaleDate { get; set; }   
        public string CustomerNumber { get; set; }
        public string SalesCode { get; set; }
        public string CustomerName { get; set; }
        public double TotalAmount { get; set; }
        public double SubTotalAmount { get; set; } 
        [NotMapped]
        public double PaidAmount { get; set; }
        [NotMapped]
        public double DueAmount { get; set; }
        public virtual List<SalesDetails> SalesDetails { get; set; } 
 
    }
}