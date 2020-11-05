using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetCoreApi2.Data.Models
{
    public class EmpresasModel
    {
        [Key]
        public int Id { get; set; }
        public string nombre { get; set; }
        public string CIF { get; set; }
        public ICollection<ClientesModel> Clientes { get; set; } 
    }
}
