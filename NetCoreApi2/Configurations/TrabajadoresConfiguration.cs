using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetCoreApi2.Data.Models;

namespace NetCoreApi2.Configurations
{
    public class TrabajadoresConfiguration : IEntityTypeConfiguration<TrabajadoresModel>
    {
        public void Configure(EntityTypeBuilder<TrabajadoresModel> builder)
        {
            builder.HasMany(t => t.Partes).WithOne(p => p.trabajador);
        }//end method Configure

    }//end class
}
