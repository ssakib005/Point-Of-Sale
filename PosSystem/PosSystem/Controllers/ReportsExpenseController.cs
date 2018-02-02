using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;

namespace PosSystem.Controllers
{
    public class ReportsExpenseController : Controller
    {
        PosDbContext _db=new PosDbContext();
        public ActionResult ExpenseReport()
        {
            return View();
        }
        public JsonResult GetBranch()
        {
            var datalist = _db.Branches.ToList();
            var jsonData = datalist.Select(c => new{
                Id = c.Id,
                Name = c.Name
            });
            return Json(jsonData);
        }
    }
}