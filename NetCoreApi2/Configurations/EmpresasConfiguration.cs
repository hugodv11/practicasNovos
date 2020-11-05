using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetCoreApi2.Data.Models;

namespace NetCoreApi2.Configurations
{
    public class EmpresasConfiguration : IEntityTypeConfiguration<EmpresasModel>
    {
        public void Configure(EntityTypeBuilder<EmpresasModel> builder)
        {
            builder.HasMany(e => e.Clientes).WithOne(c => c.empresa);
        }//end method Configure

    }//end class
}
