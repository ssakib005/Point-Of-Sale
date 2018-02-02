using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;

namespace PosSystem.Controllers
{
    public class ReportSalesController : Controller
    {
        PosDbContext _db=new PosDbContext();
        public ActionResult SalesReport()
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
        public JsonResult GetSalesDetails() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationSales.ToList();
                var jsonData = dataList.Select(c => new
                {
                    Id = c.Id,
                    Date = c.SaleDate,
                    Description = c.CustomerNumber,
                    Branch = c.Branch,
                    Customer = c.CustomerName, 
                    Total = c.SubTotalAmount
                });

                return Json(new { data = jsonData }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ShowSalesDetails() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationSales.ToList();
                var jsonData = dataList.Select(c => new
                {
                    Id = c.Id,
                    Date = c.SaleDate,
                    Description = c.CustomerNumber,
                    Branch = c.Branch,
                    Customer = c.CustomerName,
                    Total = c.SubTotalAmount
                });
                return Json(jsonData);
            }
        }
        public JsonResult GetSalesFromDate(string branchName, DateTime fDate, DateTime tDate) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationSales.Where(c => c.Branch == branchName && c.SaleDate >= fDate && c.SaleDate <= tDate).ToList();
                var jsonData = dataList.Select(c => new 
                {
                    Id = c.Id,
                    Date = c.SaleDate,
                    Description = c.CustomerNumber,
                    Branch = c.Branch,
                    Customer = c.CustomerName,
                    Total = c.SubTotalAmount
                });
                return Json(jsonData);
            }
        }

        public JsonResult GetSalesFromCode(string branchName, DateTime fDate, DateTime tDate, string salesCode)  
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationSales.Where(c => c.Branch == branchName && c.SaleDate >= fDate && c.SaleDate <= tDate).ToList();
                if (salesCode == null)
                {
                    var jsonData1 = dataList.Select(c => new
                    {
                        Id = c.Id,
                        Date = c.SaleDate,
                        Description = c.CustomerNumber,
                        Branch = c.Branch,
                        Customer = c.CustomerName, 
                        Total = c.SubTotalAmount
                    });
                    return Json(jsonData1);
                }
                else
                {
                    var data = dataList.Where(c => c.SalesCode.Contains(salesCode)); 
                    var jsonData = data.Select(c => new
                    {
                        Id = c.Id,
                        Date = c.SaleDate,
                        Description = c.CustomerNumber,
                        Branch = c.Branch,
                        Customer = c.CustomerName,
                        Total = c.TotalAmount
                    });
                    return Json(jsonData);
                }

            }
        }
        public JsonResult GetSalesFromId(int ctId) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var data = db.OperationSales.FirstOrDefault(c => c.Id == ctId);
                var sealData = db.SalesDetails.Where(c=>c.SalesId == ctId).ToList();
                var jsonData = new
                {
                    Date = data.SaleDate,
                    Description = data.CustomerNumber,
                    Branch = data.Branch, 
                    Customer = data.CustomerName,
                    Total = data.SubTotalAmount
                };
                return Json(jsonData);
            }
        }
        public JsonResult GetSalesDetailsFromId(int ctId) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var salesData = db.SalesDetails.Where(c => c.SalesId == ctId).ToList();
                var jsonData = salesData.Select(c =>
                    new {ItemName = c.ItemName, Quantity = c.Qty, Price = c.Price, Total = c.Total});
                return Json(jsonData);
            }
        }



    }
}