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
    public class Branch
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string OrgName { get; set; } 
        [Required]
        public string Code { get; set; }
        public string ContactNumber { get; set; }
        public string Address { get; set; }
        public long OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}