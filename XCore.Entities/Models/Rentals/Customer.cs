using System.ComponentModel.DataAnnotations;

namespace XCore.Entities.Models.Rentals
{
    public class Customer
    {
        public int CustomerId { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(125)]
        public string Address { get; set; }
    }
}
