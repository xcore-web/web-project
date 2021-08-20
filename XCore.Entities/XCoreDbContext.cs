using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using XCore.Entities.Configurations;
using XCore.Entities.Models;
using XCore.Entities.Models.Rentals;

namespace XCore.Entities
{
    public class XCoreDbContext : IdentityDbContext<User>
    {
        public XCoreDbContext(DbContextOptions options)
          : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Media> Medias { get; set; }

        public DbSet<Rental> Rentals { get; set; }

        public DbSet<MessageItem> MessageItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration<IdentityRole>((IEntityTypeConfiguration<IdentityRole>)new RoleConfiguration());
        }
    }
}
