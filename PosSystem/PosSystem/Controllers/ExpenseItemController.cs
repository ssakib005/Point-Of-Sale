using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models;
using PosSystem.Models.DbFile;
using PosSystem.Models.Setup;

namespace PosSystem.Controllers
{
    public class ExpenseItemController : Controller
    {
        PosDbContext _db = new PosDbContext();
        public ActionResult AddExpenseItem()
        {
            return View();
        }
        [HttpGet]
        public ActionResult OpenExpenseItemForm(long id = 0)
        {
            if (id == 0)
            {
                return View(new ExpenseItem());
            }
            else
            {
                return View(_db.ExpenseItems.FirstOrDefault(x => x.Id == id));

            }
        }
        [HttpPost]
        public ActionResult OpenExpenseItemForm(ExpenseItem expenseItemSave)
        {
            if (expenseItemSave.Id == 0)
            {
                if (ModelState.IsValid)
                {
                    _db.ExpenseItems.Add(expenseItemSave);
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {

                _db.Entry(expenseItemSave).State = EntityState.Modified;
                var rowAdded = _db.SaveChanges() > 0;
                if (rowAdded)
                {
                    var jsonData = "success";
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetExpenseItemData()
        {
            var dataList = _db.ExpenseItems.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id = c.Id,
                CName = c.ExpenseCategoryName, 
                Name = c.Name,
                Code = c.Code,
                Description = c.Description
            });
            return Json(new
            {
                data = jsonData
            }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteItem(long id)
        {
            var data = _db.ExpenseItems.FirstOrDefault(m => m.Id == id);
            _db.ExpenseItems.Remove(data);
            _db.SaveChanges();
            return Json(new { success = true, message = "Deleted Successfully.........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubCategoryFromRootCategory()
        {
            var dataList = _db.ExpenseCategories.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }

        public JsonResult ItemChecker(string name, int id)
        {
            var data = _db.ExpenseItems.FirstOrDefault(c => c.Name == name && c.CategoryId==id); 
            if (data == null)
            {
                var dataList = _db.ExpenseItems.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var orgCountList = new { Count = -1 };
            return Json(orgCountList);
        }
    }
}