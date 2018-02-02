using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PosSystem.Models.Setup;

namespace PosSystem.Models.Setup
{
    public class Item
    {
        public long Id { get; set; }
        public string CtCode { get; set; } 
        public string ItCode { get; set; }
        [Required]
        public string CatName { get; set; }
        public string Name { get; set; }
        public double CostPrice { get; set; }
        public double SellPrice { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public long CategoryId { get; set; }
        public ItemCategory Category { get; set; }
        [NotMapped]
        public HttpPostedFileWrapper Img { get; set; }
    }
}