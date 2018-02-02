using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PosSystem.Models.Setup
{
    public class Party
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Email { get; set; } 
        public string ContactNumber { get; set; }
        public string Address { get; set; }
        public byte[] Image { get; set; }
        public string Customer { get; set; }
        public string Supplier { get; set; }
        [NotMapped]
        public HttpPostedFileWrapper Img { get; set; }
    }
}
