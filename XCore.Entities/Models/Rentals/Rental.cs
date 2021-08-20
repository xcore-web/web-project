using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace XCore.Entities.Models.Rentals
{
    public class Rental
    {
        public int RentalId { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfRental { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "Date")]
        public DateTime DueDate { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public int MediaId { get; set; }

        public Media Media { get; set; }
    }
}
