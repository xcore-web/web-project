using System.ComponentModel.DataAnnotations;

namespace XCore.Entities.Models.Rentals
{
    public class Category
    {
        public int CategoryId { get; set; }

        [MaxLength(50)]
        public string Description { get; set; }
    }
}
