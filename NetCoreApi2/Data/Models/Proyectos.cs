using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreApi2.Data.Models
{
    public class ProyectosModel
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int ClienteId { get; set; }  
        public ClientesModel cliente { get; set; } 
        public ICollection<PartesModel> Partes { get; set; }

    }
}
