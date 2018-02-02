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
    public class ItemCategoryController : Controller
    {
       PosDbContext _db = new PosDbContext();
        public ActionResult AddItemCategory()
        {
            return View();
        }
        [HttpGet]
        public ActionResult OpenItemCategoryForm(long id = 0) 
        {
            if (id == 0)
            {
                return View(new ItemCategory());
            }
            else
            {
                return View(_db.Categories.FirstOrDefault(x => x.Id == id));
            }
        }
        [HttpPost]
        public JsonResult OpenItemCategoryForm(ItemCategory itemCategorySave)
        {
            if (itemCategorySave.Id == 0)
            {
                if (itemCategorySave.Img == null)
                {
                    if (ModelState.IsValid)
                    {
                        _db.Categories.Add(itemCategorySave);
                        var rowAdded = _db.SaveChanges() > 0;
                        if (rowAdded)
                        {
                            return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                }
                else
                {
                    var data = new byte[itemCategorySave.Img.ContentLength];
                    itemCategorySave.Img.InputStream.Read(data, 0, itemCategorySave.Img.ContentLength);
                    itemCategorySave.Image = data;
                    if (ModelState.IsValid)
                    {
                        _db.Categories.Add(itemCategorySave);
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
                if (itemCategorySave.Img == null)
                {
                    _db.Entry(itemCategorySave).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    var data = new byte[itemCategorySave.Img.ContentLength];
                    itemCategorySave.Img.InputStream.Read(data, 0, itemCategorySave.Img.ContentLength);
                    itemCategorySave.Image = data;

                    _db.Entry(itemCategorySave).State = EntityState.Modified;
                    var rowAdded = _db.SaveChanges() > 0;
                    if (rowAdded)
                    {
                        return Json(new { success = true, message = "Saved Successfully.........!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new { success = false, message = "Save Unsuccessful........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemCategoryData()
        {
            var dataList = _db.Categories.ToList();
            var jsonData = dataList.Select(c => new
            {
                Id = c.Id,
                CategoryType = c.Category,
                Category= c.CategoryName,
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
            var dataList = _db.Categories.FirstOrDefault(m => m.Id == id);
            _db.Categories.Remove(dataList);
            _db.SaveChanges();
            return Json(new { success = true, message = "Deleted Successfully.........!" }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSubCategoryFromRootCategory()
        {
            var dataList = _db.Categories.ToList();
            var jsonData = dataList.Select(c => new { Id = c.Id, Name = c.Name });
            return Json(jsonData);
        }

        public JsonResult CategoryChecker(string name)
        {
            var data = _db.Categories.FirstOrDefault(c => c.Name == name);
            if (data == null)
            {
                var dataList = _db.Categories.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var catCountList = new { Count = -1 };
            return Json(catCountList);
        }
        public JsonResult ChildCategoryChecker(string name, int id)
        {
            var data = _db.Categories.FirstOrDefault(c => c.Name == name && c.RootId == id );
            if (data == null)
            {
                var dataList = _db.Categories.ToList();
                var jsonData = dataList.Select(c => new { Code = c.Code });
                return Json(jsonData);
            }
            var catCountList = new { Count = -1 };
            return Json(catCountList);
        }
    }

}