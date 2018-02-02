using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace PosSystem.Models.Setup
{
    public class Organization
    {
        public long Id { get; set; }
        
        public string Name { get; set; }

        public string Code { get; set; }

        public string ContactNumber { get; set; }

        public string Address { get; set; }

        public byte[] Image { get; set; }

        [NotMapped]
        public HttpPostedFileWrapper Img { get; set; }
        public List<Branch> Branches { get; set; } 
    }
}