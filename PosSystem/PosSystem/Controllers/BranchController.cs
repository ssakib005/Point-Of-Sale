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
    public class BranchController : Controller
    {
        PosDbContext _db=new PosDbContext();
        public ActionResult AddBranch()
        {
            return View();
        }

        [HttpGet]
        public ActionResult OpenBranchForm(long id=0)
        {
            if (id == 0)
            {
                return View(new Branch());
            }
            else
            {
                return View(_db.Branches.FirstOrDefault(x => x.Id == id));
            }
        }

        [HttpPost]
        public ActionResult OpenBranchForm(Branch branchSave)
        {
            if (branchSave.Id == 0)
            {
                    if (ModelState.IsValid)
                    {
                        _db.Branches.Add(branchSave);
                        var rowAdded = _db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                
            }
            else
            {
             
                    _db.Entry(branchSave).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                    return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                }
                
            }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }

         public JsonResult GetBranchData()
        {
            var dataList = _db.Branches.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id= c.Id,
                Name=c.Name,
                Organization = c.OrgName,
                Code =c.Code,
                ContactNumber=c.ContactNumber,
                Address = c.Address
            });
            return Json(new
            {
                data = jsonData
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteBranch(long id)
        {
            var datalist = _db.Branches.FirstOrDefault(m => m.Id == id);
            _db.Branches.Remove(datalist);
            _db.SaveChanges();
            return Json(new {success = true, message = "Deleted Successfully...!!!"}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrganizations()
        {
            var dataList = _db.Organizations.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }
        public JsonResult BranchChecker(string name, int id) 
        {
            var data = _db.Branches.FirstOrDefault(c => c.OrganizationId == id && c.Name == name );
            if (data == null)
            {
                var dataList = _db.Branches.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var orgCountList = new { Count = -1 };
            return Json(orgCountList);
        }
    }
    
}