using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Management;
using System.Web.Mvc;
using PosSystem.Models.DbFile;
using PosSystem.Models.Operation.Purchase;
using PosSystem.Models.Operation.Sales;

namespace PosSystem.Controllers
{
    public class OperationSalesController : Controller
    {
        // GET: Sale
        public ActionResult AddSale() 
        {
            return View(); 
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddSale(OperationSales sales)
        {
            using (PosDbContext db = new PosDbContext())
            {
                foreach (var item in sales.SalesDetails)
                {
                    var name = item.ItemName;
                    var data = db.SalesDetails.FirstOrDefault(c => c.ItemName == name);
                    if (data == null)
                    {
                        db.OperationSales.Add(sales);
                        var isAdded = db.SaveChanges() > 0;
                        if (isAdded)
                        {
                            return View(sales);
                        }
                    }
                    else
                    {
                        data.Qty += item.Qty;
                        data.StockQty -= item.Qty;
                        data.Total += item.Total;
                        db.Entry(data).State = EntityState.Modified;
                        var rowAdded = db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            var purchasData = db.PurchaseDetails.FirstOrDefault(c => c.ItemName == name);
                            purchasData.Quantity -= item.Qty;
                            var amount = purchasData.Amount;
                            purchasData.Total = purchasData.Quantity * amount;
                            db.Entry(purchasData).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                }

                return View(sales);
            }
        }

        public JsonResult CreateSalesCode() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationSales.ToList();
                var jsonData = new { Count = dataList.Count };
                return Json(jsonData);
            }
        }

        public JsonResult GetBranch()
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Branches.ToList();
                var jsonData = dataList.Select(c => new {Id = c.Id, Name = c.Name});
                return Json(jsonData);
            }
        }
        public JsonResult GetEmployee(string name) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Employees.Where(c=>c.BName == name ).ToList();
                var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
                return Json(jsonData);
            }
        }
        public JsonResult GetItem() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.PurchaseDetails.ToList();
                var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.ItemName});
                return Json(jsonData);
            }
        }

        public JsonResult GetCustomerFromParty() 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Parties.ToList();
                var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name});
                return Json(jsonData);
            }
        }

        public JsonResult GetItemDetails(string name)  
        {
            using (PosDbContext db = new PosDbContext())
            {
                var data = db.PurchaseDetails.FirstOrDefault(c=>c.ItemName == name);
                var jsonData = new
                {
                    Id = data.Id,
                    Quantity = data.Quantity,
                    Price = data.Amount,
                    ItemName = data.ItemName,
                    
                    CategoryId = data.CategoryId
                };

                return Json(jsonData);
            }
        }
    }
}