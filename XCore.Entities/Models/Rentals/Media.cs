using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace XCore.Entities.Models.Rentals
{
    public class Media
    {
        public int MediaId { get; set; }

        [MaxLength(100)]
        public string ItemTitle { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public Category ItemCategory { get; set; }
    }
}
