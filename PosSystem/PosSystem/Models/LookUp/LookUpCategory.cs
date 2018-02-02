using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.WebPages.Html;
using PosSystem.Models.DbFile;
using SelectListItem = System.Web.Mvc.SelectListItem;

namespace PosSystem.Models.LookUp
{
    public class LookUpCategory
    {
        PosDbContext _db=new PosDbContext();

        public List<SelectListItem> GetDefaultCategory()
        {
            var selectDefaultCategory = new List<SelectListItem>()
            {
                new SelectListItem() {Text = "-------------------Select------------------", Value = ""}
            };
            return selectDefaultCategory;
        }
        public List<SelectListItem> GetCategory()
        {
            var data = _db.Categories.ToList();
            var defaultCategory = GetDefaultCategory();
            defaultCategory.AddRange(data.Select(c => new SelectListItem(){Text = c.Name,Value = c.Id.ToString()}));
            return defaultCategory;
        }
        public List<SelectListItem> GetOrganizationLookUp() 
        {
            var data = _db.Organizations.ToList();
            var defaultCategory = GetDefaultCategory();
            defaultCategory.AddRange(data.Select(c => new SelectListItem() { Text = c.Name, Value = c.Id.ToString() }));
            return defaultCategory;
        }
        public List<SelectListItem> GetExpenseCategoryLookUp()
        {
            var data = _db.ExpenseCategories.ToList();
            var defaultCategory = GetDefaultCategory();
            defaultCategory.AddRange(data.Select(c => new SelectListItem() { Text = c.Name, Value = c.Id.ToString() }));
            return defaultCategory;
        }

        public List<SelectListItem> GetExpenseItemLookup()
        {
            var data = _db.ExpenseItems.ToList();
            var defaultItem = GetDefaultCategory();
            defaultItem.AddRange(data.Select(c=>new SelectListItem(){Text = c.Name, Value = c.Id.ToString()}));
            return defaultItem;
        }
    }
}