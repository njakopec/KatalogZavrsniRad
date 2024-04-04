


using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext:DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) 
            : base(options) { 

        }

        public DbSet<Kategorija> Kategorije { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proizvod>().HasOne(p => p.Kategorija);
        }

    }
}
