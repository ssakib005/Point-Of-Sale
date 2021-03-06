﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.DbFile;

namespace PosSystem.Controllers
{
    public class ReportsStockController : Controller
    {
        PosDbContext _db=new PosDbContext();
        public ActionResult StockReport()
        {
            return View();
        }

        public JsonResult GetBranch()
        {
            var datalist = _db.Branches.ToList();
            var jsonData=datalist.Select(c=>new{Id=c.Id,Name=c.Name});
            return Json(jsonData);
        }

        public JsonResult GetStockReport() 
        {
            var datalist = _db.OperationPurchases.ToList();
            var jsonData = datalist.Select(c => new {Id = c.Id, Name = c.Branch});
            return Json(jsonData);
        }
    }
}