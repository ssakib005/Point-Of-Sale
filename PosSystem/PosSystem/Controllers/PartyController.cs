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
    public class PartyController : Controller
    {
        PosDbContext _db=new PosDbContext();
       public ActionResult AddParty()
        {
            return View();
        }

        [HttpGet]
        public ActionResult OpenPartyForm(long id = 0)
        {
            if (id == 0)
            {
                return View(new Party());
            }
            else
            {
                return View(_db.Parties.FirstOrDefault(x => x.Id == id));
            }
        }

        [HttpPost]
        public JsonResult OpenPartyForm(Party partysave)
        {
            if (partysave.Id == 0)
            {
                if (ModelState.IsValid)
                {
                    _db.Parties.Add(partysave);
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                _db.Entry(partysave).State = EntityState.Modified;
                var rowAdded = _db.SaveChanges() > 0;
                if (rowAdded)
                {
                    return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPartyData()
        {
            var dataList = _db.Parties.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id = c.Id,
                Name=c.Name,
                Code=c.Code,
                ContactNumber = c.ContactNumber,
                Email=c.Email,
                Address=c.Address,
                Customer = c.Customer,
                Supplier = c.Supplier,
            });
            return Json(new {data = jsonData}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteParty(long id)
        {
            var datalist = _db.Parties.FirstOrDefault(m => m.Id == id);
            _db.Parties.Remove(datalist);
            _db.SaveChanges();
            return Json(new { success = true, message = "Deleted Successfully...!!!" }, JsonRequestBehavior.AllowGet);
        }

    }
}