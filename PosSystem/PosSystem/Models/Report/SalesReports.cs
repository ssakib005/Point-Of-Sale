using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using PosSystem.Models.Setup;

namespace PosSystem.Models.Report
{
    public class SalesReports
    {
        public int Id { get; set; }
        public string SalesCode { get; set; }
        public string BName { get; set; }
        [NotMapped]
        public string Remarks { get; set; }
        [NotMapped]
        public DateTime PurchaseDate { get; set; }
        [NotMapped]
        public string Supplier { get; set; }
        [NotMapped]
        public double TotalAmount { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}