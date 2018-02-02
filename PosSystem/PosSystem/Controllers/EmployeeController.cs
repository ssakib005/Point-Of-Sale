using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;
using PosSystem.Models.Setup;

namespace PosSystem.Controllers
{
    public class EmployeeController : Controller
    {
       PosDbContext _db=new PosDbContext();

        public ActionResult EmployeeDetails()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CreateEmployee(long id = 0)
        {
            if (id == 0)
            {
                return View(new Employee());
            }
            else
            {
                return View(_db.Employees.FirstOrDefault(x => x.Id == id));
            }
        }

        [HttpPost]
        public ActionResult CreateEmployee(Employee employeesave)
        {
            if (employeesave.Id == 0)
            {
                if (ModelState.IsValid)
                {
                    _db.Employees.Add(employeesave);
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, messsage = "Saved Successfully....!" });

                    }
                }
                else
                {
                    _db.Entry(employeesave).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        var jsonData = "Success";
                        return Json(jsonData, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new { success = false, message = "Save Failed" });
        }

        public JsonResult GetEmployeeData()
        {
            var datalist = _db.Employees.ToList();
            var jsonData = datalist.Select(c => new
            {
                Id = c.Id,
                Name = c.Name,
                Code=c.Code,
                Outlet=c.BName,
                Contact =c.ContactNo,
                Address=c.PresentAddress
            });
            return Json(new { data = jsonData }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteEmployee(long id)
        {
            var datalist = _db.Employees.FirstOrDefault(m => m.Id == id);
            _db.Employees.Remove(datalist);
            var rowAdded=_db.SaveChanges() > 0;
            if (rowAdded)
            {
                return Json(new { success = true, message = "Deleted Successfully...!!" }, JsonRequestBehavior.AllowGet);
            }
          return Json(new { success = false, message = "Delete Failed...!!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBranch()
        {
            var datalist = _db.Branches.ToList();
            var jsonData = datalist.Select(c => new
            {
                Id=c.Id,
                Name=c.Name
            });
            return Json(jsonData);
        }

        public JsonResult GetEmployee()
        {
            var datalist = _db.Employees.ToList();
            var jsonData = datalist.Select(c => new
            {
                Id = c.Id,
                Name =c.Name
            });
            return Json(jsonData);
        }
    }
}