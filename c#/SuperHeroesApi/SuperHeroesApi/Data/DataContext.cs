
namespace SuperHeroesApi.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=DESKTOP-HGB0AIU\\SQLEXPRESS;Database=superherodb;Trusted_Connection=True;TrustServerCertificate=True;");
        }
        
        public DbSet<SuperHero> SuperHeroes { get; set; }
    }
}
