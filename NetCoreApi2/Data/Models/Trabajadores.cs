using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetCoreApi2.Data.Models
{
    public class TrabajadoresModel
    {
        [Key]
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public ICollection<PartesModel> Partes { get; set; }

    } 
}
