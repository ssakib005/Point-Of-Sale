using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace PosSystem.Models.Setup
{
    public class ItemCategory
    {
        public long Id { get; set; }
        public string Category { get; set; }
        public string CategoryName { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public long? RootId { get; set; }
        public ItemCategory Root { get; set; }
        public List<ItemCategory> Child { get; set; }
        [NotMapped]
        public HttpPostedFileWrapper Img { get; set; }

    }
}