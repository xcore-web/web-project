import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-framework',
  templateUrl: './entity-framework.component.html',
  styleUrls: ['./entity-framework.component.scss']
})
export class EntityFrameworkComponent implements OnInit {

  categoryModel =
  `
    public class Category
    {
        public int CategoryId { get; set; }

        [MaxLength(50)]
        public string Description { get; set; }


        // ***** NOTE *****
        // Not sure about the use of this next line, so I comment it out
        // Maybe it would make sense to use to group DVD and Blu-Ray as Movies
        // and group platform (Xbox, Play Station and Nintendo) as Games
        // public string Code { get; set; }
    }
  `;

  customerModel =
  `
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
  `;

  mediaModel =
  `
    public class Media
    {
        public int MediaId { get; set; }

        [MaxLength(100)]
        public string ItemTitle { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; } // Foreign Key
        public Category ItemCategory { get; set; } // Navigation Property
    }
  `;

  rentalModel =
  `
    public class Rental
    {
        public int RentalId { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfRental { get; set; } = DateTime.UtcNow;

        [Column(TypeName = "Date")]
        public DateTime DueDate { get; set; }

        // Customer
        public int CustomerId { get; set; } // Foreign Key
        public Customer Customer { get; set; } // Navigation Property

        // Media
        public int MediaId { get; set; } // Foreign Key
        public Media Media { get; set; } // Navigation Property
    }
  `;

  dbContext =
  `
    public class XCoreDbContext : IdentityDbContext<User>
    {
        public XCoreDbContext(DbContextOptions options) : base(options)
        {
        }

        // Movie Rental Project -- COMP200
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        
        // Messages
        public DbSet<MessageItem> MessageItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Role Configuration
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }
    }
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
