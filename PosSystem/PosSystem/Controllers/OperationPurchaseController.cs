using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;
using PosSystem.Models.Operation.Purchase;

namespace PosSystem.Controllers
{
    public class OperationPurchaseController : Controller
    {

        public ActionResult Purchase()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Purchase(OperationPurchase purchase)
        {
            using (PosDbContext db = new PosDbContext())
            {
                if (ModelState.IsValid && purchase.PurchaseDetails != null && purchase.PurchaseDetails.Count > 0)
                {

                    foreach (var item in purchase.PurchaseDetails)
                    {
                        var purchaseItem = item.ItemName;
                        

                        var data = db.PurchaseDetails.FirstOrDefault(c => c.ItemName == purchaseItem);
                        if (data == null) 
                        {
                            db.OperationPurchases.Add(purchase);
                            var isRowAdded = db.SaveChanges() > 0;
                            if (isRowAdded)
                            {
                                return View(purchase);
                            }
                        }
                        else
                        {
                            data.Quantity += item.Quantity;
                            data.Total += item.Total;
                            db.Entry(data).State = EntityState.Modified;  
                            var rowAdded = db.SaveChanges() > 0; 
                        }
                    }
                    return View(purchase);

                }
            }

            return View();
        }

        public JsonResult GetParty()
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Parties.Where(c => c.Supplier.Equals("✔")).ToList();
                var jsonData = dataList.Select(c => new {Id = c.Id, Name = c.Name});
                return Json(jsonData);
            }
        }

        public JsonResult GetItem()
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Items.ToList();
                var jsonData = dataList.Select(c => new {Id = c.Id, Name = c.Name});
                return Json(jsonData);
            }
        }

        public JsonResult GetEmployee(string name)
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.Employees.Where(c=>c.BName == name).ToList();
                var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
                return Json(jsonData);
            }
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
        public JsonResult GetItemCostPrice(string name) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var data = db.Items.FirstOrDefault(c=>c.Name == name );
                var jsonData = new {Id = data.Id, CostPrice = data.CostPrice};
                return Json(jsonData);
            }
        }
        public JsonResult CreatePurchaseCode()
        {
            using (PosDbContext db = new PosDbContext())
            {
                var dataList = db.OperationPurchases.ToList();
                var jsonData = new {Count = dataList.Count};
                return Json(jsonData);
            }
        }
        public JsonResult GetItemsList(string name) 
        {
            using (PosDbContext db = new PosDbContext())
            {
                var data = db.PurchaseDetails.FirstOrDefault(c => c.ItemName == name);
                if (data != null) 
                {
                    var jsonData = new { Id = data.Id, Name = data.ItemName, Quantity = data.Quantity, Amount = data.Amount };
                    return Json(jsonData);
                }
                else
                {
                    var jData = new {itemData = -1};
                    return Json(jData);
                }
            }
        }
    } 
}