using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PosSystem.Models.Setup;

namespace PosSystem.Models.Report
{
    public class IncomeReport
    {
        public int Id { get; set; }
        public string BName { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}