using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetCoreApi2.Data.Models;

namespace NetCoreApi2.Configurations
{
    public class ClientesConfiguration : IEntityTypeConfiguration<ClientesModel>
    {
        public void Configure(EntityTypeBuilder<ClientesModel> builder)
        {
            builder.HasMany(c => c.Proyectos).WithOne(p => p.cliente);
        }//end method Configure

    }//end class
}
