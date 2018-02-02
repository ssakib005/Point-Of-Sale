using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models;
using PosSystem.Models.DbFile;
using PosSystem.Models.LookUp;
using PosSystem.Models.Setup;

namespace PosSystem.Controllers
{
    public class OrganizationController : Controller
    {
        PosDbContext _db = new PosDbContext();
        
        public ActionResult AddOrganization()
        {
            return View();
        }
        [HttpGet]
        public ActionResult OpenOrganizationForm(long id = 0)
        {
            if (id == 0)
            {
                return View(new Organization());
            }
            else
            {
                return View(_db.Organizations.FirstOrDefault(x => x.Id == id));
            }
            
        }
        [HttpPost]
        public JsonResult OpenOrganizationForm(Organization organization)
        {
            
            if (organization.Id == 0) 
            {
                if (organization.Image == null)
                {
                    if (ModelState.IsValid)
                    {
                        _db.Organizations.Add(organization);
                        var rowAdded = _db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                else
                {
                    var data = new byte[organization.Img.ContentLength];
                    organization.Img.InputStream.Read(data, 0, organization.Img.ContentLength);
                    organization.Image = data;
                    if (ModelState.IsValid)
                    {
                        _db.Organizations.Add(organization);
                        var rowAdded = _db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
            }
            else
            {
                if (organization.Img == null)
                {
                    _db.Entry(organization).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Updated Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    var data = new byte[organization.Img.ContentLength];
                    organization.Img.InputStream.Read(data, 0, organization.Img.ContentLength);
                    organization.Image = data;

                    _db.Entry(organization).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Updated Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }

            }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrganization()
        {
            var dataList = _db.Organizations.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id = c.Id,
                Name = c.Name,
                Code = c.Code,
                ContactNumber = c.ContactNumber,
                Address = c.Address
            });
            return Json(new { data = jsonData }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteOrg(long id)
        {
            var dataList = _db.Organizations.FirstOrDefault(c => c.Id == id);
            _db.Organizations.Remove(dataList);
            _db.SaveChanges();
            return Json(new {success = true, message = "Deleted Successfully.........!"}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OrganizationChecker(string name)
        {
            var data = _db.Organizations.FirstOrDefault(c => c.Name == name);
            if (data == null)
            {
                var dataList = _db.Organizations.ToList();
                var jsonData = dataList.Select(c => new {Code = c.Code});
                return Json(jsonData);
            }
            var orgCountList = new {Count = -1}; 
            return Json(orgCountList);
        }

    }
}