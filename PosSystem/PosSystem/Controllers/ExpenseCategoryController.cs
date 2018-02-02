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
    public class ExpenseCategoryController : Controller
    {
        PosDbContext _db = new PosDbContext();
        public ActionResult AddExpenseCategory()
        {
            return View();
        }
        [HttpGet]
        public ActionResult OpenExpenseCategoryForm(long id = 0)
        {
            if (id == 0)
            {
                return View(new ExpenseCategory());
            }
            else
            {
                return View(_db.ExpenseCategories.FirstOrDefault(x => x.Id == id));
                
            }
        }
        [HttpPost]
        public ActionResult OpenExpenseCategoryForm(ExpenseCategory expenseCategorySave)
        {
            if (expenseCategorySave.Id == 0)
            {
                    if (ModelState.IsValid)
                    {
                        _db.ExpenseCategories.Add(expenseCategorySave);
                        var rowAdded = _db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
            else
            {

                    _db.Entry(expenseCategorySave).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                    return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                }
                }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetExpenseCategoryData()
        {
            var dataList = _db.ExpenseCategories.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id = c.Id,
                CategoryType = c.Category,
                CategoryName = c.CategoryName,
                Name = c.Name,
                Code = c.Code,
                Description = c.Description
            });
            return Json(new
            {
                data = jsonData
            }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteCategory(long id)
        {
            var dataList = _db.ExpenseCategories.FirstOrDefault(m => m.Id == id);
            _db.ExpenseCategories.Remove(dataList);
            _db.SaveChanges();
            return Json(new { success = true, message = "Deleted Successfully.........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubCategoryFromRootCategory()
        {
            var dataList = _db.ExpenseCategories.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }
        public JsonResult CategoryChecker(string name)
        {
            var data = _db.ExpenseCategories.FirstOrDefault(c => c.Name == name);
            if (data == null)
            {
                var dataList = _db.ExpenseCategories.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var orgCountList = new { Count = -1 };
            return Json(orgCountList);
        }
        public JsonResult ChildCategoryChecker(string name, int id)
        {
            var data = _db.ExpenseCategories.FirstOrDefault(c => c.Name == name && c.ExpenseRootId == id);
            if (data == null)
            {
                var dataList = _db.ExpenseCategories.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var orgCountList = new { Count = -1 };
            return Json(orgCountList);
        }
    }
}