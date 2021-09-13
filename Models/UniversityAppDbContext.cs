using Microsoft.EntityFrameworkCore;

namespace UnversityApp.Model
{
    public class UniversityAppDbContext : DbContext
    {
        public UniversityAppDbContext()
        {

        }

        public UniversityAppDbContext(DbContextOptions<UniversityAppDbContext> options)
        : base(options)
        {
        }

        public DbSet<CustomerSecretInfo> CustomerSecretInfos { get; set; }
    }
}
