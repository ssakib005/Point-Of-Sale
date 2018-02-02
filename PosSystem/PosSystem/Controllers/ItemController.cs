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
    public class ItemController : Controller
    {
       PosDbContext _db = new PosDbContext();
        public ActionResult AddItem()
        {
            return View();
        }

        [HttpGet]
        public ActionResult OpenItemForm(long id = 0)
        {
            if (id == 0)
            {
                return View(new Item());
            }
            else
            {
                var updateItem = _db.Items.FirstOrDefault(x => x.Id == id);
                var getCategoryName = _db.Categories.FirstOrDefault(c => c.Id == updateItem.CategoryId);
                var item = new Item();
                item.CategoryId = updateItem.CategoryId;
                item.Id = updateItem.Id;
                item.Name = updateItem.Name;
                item.CtCode = updateItem.CtCode;
                item.ItCode = updateItem.ItCode;
                item.Code = updateItem.Code;
                item.CatName = getCategoryName.Name;
                item.CategoryId = updateItem.CategoryId;
                item.CostPrice = updateItem.CostPrice;
                item.SellPrice = updateItem.SellPrice;
                item.Description = updateItem.Description;
                return View(item);
            }

        }

        [HttpPost]
        public ActionResult OpenItemForm(Item itemSave) 
        {
            if (itemSave.Id == 0)
            {
                if (ModelState.IsValid)
                {
                    _db.Items.Add(itemSave);
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                _db.Entry(itemSave).State = EntityState.Modified;
                var rowAdded = _db.SaveChanges() > 0;
                if (rowAdded)
                {
                    return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(new { success = true, message = "Saved Failed.........!" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetItemData()
        {
            var datalist = _db.Items.ToList();
            var jsonData = datalist.Select(c => new
            {
                Id=c.Id,
                CategoryType=c.CatName,
                Name=c.Name,
                Code=c.Code,
                Description=c.Description,
                CostPrice=c.CostPrice,
                SellPrice=c.SellPrice
            });
            return Json(new {data = jsonData}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteItem(long id)
        {
            var datalist = _db.Items.FirstOrDefault(m => m.Id == id);
            _db.Items.Remove(datalist);
            _db.SaveChanges();
            return Json(new {success = true, message = "Deleted Successfully "}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCatagory()
        {
            var datalist = _db.Categories.ToList();
            var jsonData= datalist.Select(c=> new {Id=c.Id,Name=c.Name});

            return Json(jsonData);
        }

        public JsonResult ItemChecker(string name, int id)
        {
            var data = _db.Items.FirstOrDefault(c => c.Name == name && c.CategoryId == id);
            if (data == null)
            {
                var data1 = _db.Items.FirstOrDefault(c => c.Name == name && c.CategoryId != id);
                if (data1 == null)
                {
                    var categoryData = _db.Categories.FirstOrDefault(c => c.Id == id);
                    var categoryCode = categoryData.Code;   
                    var dataList = _db.Items.ToList();
                    var jsonDataList = dataList.Select(c => new { Code = c.ItCode});
                    var jsonData = new {Category = categoryCode, Code = jsonDataList};  
                    return Json(jsonData);
                }
                var itemCount = new {Count = -2};

            }
            var itmCountList = new { Count = -1 };
            return Json(itmCountList);
        }
    }
}