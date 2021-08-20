using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace XCore.Entities.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            EntityTypeBuilder<IdentityRole> entityTypeBuilder = builder;
            IdentityRole[] identityRoleArray = new IdentityRole[2];
            IdentityRole identityRole1 = new IdentityRole();
            identityRole1.Name = "Viewer";
            identityRole1.NormalizedName = "VIEWER";
            identityRoleArray[0] = identityRole1;
            IdentityRole identityRole2 = new IdentityRole();
            identityRole2.Name = "Administrator";
            identityRole2.NormalizedName = "ADMINISTRATOR";
            identityRoleArray[1] = identityRole2;
            entityTypeBuilder.HasData(identityRoleArray);
        }
    }
}
