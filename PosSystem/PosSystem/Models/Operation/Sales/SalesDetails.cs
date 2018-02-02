using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PosSystem.Models.Operation.Sales
{
    public class SalesDetails
    {
        public int Id { get; set; } 
        public string ItemName { get; set; }
        public double Qty { get; set; }
        public double Price { get; set; }
        public double StockQty { get; set; }
        public double Total { get; set; }
        public int SalesId { get; set; } 
        public virtual OperationSales Sales { get; set; }
    }
}