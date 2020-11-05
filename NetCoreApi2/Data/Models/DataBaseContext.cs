using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace NetCoreApi2.Data.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<EmpresasModel> Empresas { get; set; }
        public DbSet<ClientesModel> Clientes { get; set; }
        public DbSet<ProyectosModel> Proyectos { get; set; }
        public DbSet<TrabajadoresModel> Trabajadores { get; set; }
        public DbSet<PartesModel> Partes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        
    }
}
