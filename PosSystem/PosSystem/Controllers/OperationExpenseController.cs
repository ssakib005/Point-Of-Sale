using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Management;
using System.Web.Mvc;
using PosSystem.Models.DbFile;
using PosSystem.Models.Operation.Expense;

namespace PosSystem.Controllers
{
    public class OperationExpenseController : Controller
    {
        PosDbContext _db = new PosDbContext();
        public ActionResult Expense()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Expense(OperationExpense expense)
        {
            if (ModelState.IsValid && expense.ExpenseDetails != null && expense.ExpenseDetails.Count >0)
            {
                _db.OperationExpenses.Add(expense);
                var isRowAdded = _db.SaveChanges() > 0;
                if (isRowAdded)
                {
                    return View(expense);
                }
            }
            return View();
        }


        public JsonResult GetExpenseItem()
        {
            var dataList = _db.ExpenseItems.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }

        public JsonResult GetBranch()
        {
            var dataList = _db.Branches.ToList();
            var jsonData = dataList.Select(c=>new{Id = c.Id, Name=c.Name});
            return Json(jsonData);
        }
        public JsonResult GetEmployee() 
        {
            var dataList = _db.Employees.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }

    }
}