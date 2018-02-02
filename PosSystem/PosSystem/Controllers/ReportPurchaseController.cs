using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;
using PosSystem.Models.Report;

namespace PosSystem.Controllers
{
    public class ReportPurchaseController : Controller
    {

        public ActionResult PurchaseReport()
        {
            return View();
        }
      
        public JsonResult GetBranch()
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Branches.ToList();
                var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
                return Json(jsonData);
            }
        }
        public JsonResult GetPurchaseDetails() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationPurchases.ToList();
                var jsonData = dataList.Select(c => new
                {
                    Id = c.Id,
                    Date = c.DateTime,
                    Description = c.Remarkes,
                    Branch = c.Branch,
                    Supplier = c.Supplier,
                    Total = c.TotalAmount
                });
                return Json(new { data = jsonData }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetPurchaseFromDate(string branchName, DateTime fDate, DateTime tDate)   
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationPurchases.Where(c => c.Branch == branchName && c.DateTime >= fDate && c.DateTime <= tDate).ToList();
                var jsonData = dataList.Select(c => new
                {
                    Id = c.Id,
                    Date = c.DateTime,
                    Description = c.Remarkes,
                    Branch = c.Branch,
                    Supplier = c.Supplier,
                    Total = c.TotalAmount
                });
                return Json(jsonData);
            }
        }

        public JsonResult GetPurchaseFromCode(string branchName, DateTime fDate, DateTime tDate, string purchaseCode)
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationPurchases.Where(c => c.Branch == branchName && c.DateTime >= fDate && c.DateTime <= tDate).ToList();
                if (purchaseCode == null) 
                {
                    var jsonData1 = dataList.Select(c => new
                    {
                        Id = c.Id,
                        Date = c.DateTime,
                        Description = c.Remarkes,
                        Branch = c.Branch,
                        Supplier = c.Supplier,
                        Total = c.TotalAmount
                    });
                    return Json(jsonData1);
                }
                else
                {
                    var data = dataList.Where(c => c.PurchaseCode.Contains(purchaseCode));
                    var jsonData = data.Select(c => new
                    {
                        Id = c.Id,
                        Date = c.DateTime,
                        Description = c.Remarkes,
                        Branch = c.Branch,
                        Supplier = c.Supplier,
                        Total = c.TotalAmount
                    });
                    return Json(jsonData);
                }

            }
        }
        public JsonResult GetPurchaseFromId(int ctId)
        {
            using (PosDbContext db = new PosDbContext())
            {
                var data = db.OperationPurchases.FirstOrDefault(c => c.Id == ctId);
                var jsonData = new
                {
                    Date = data.DateTime,
                    Description = data.Remarkes,
                    Branch = data.Branch,
                    Supplier = data.Supplier,
                    Total = data.TotalAmount
                };
                return Json(jsonData);
            }
        }
    }
}