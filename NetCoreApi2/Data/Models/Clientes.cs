using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreApi2.Data.Models
{
    public class ClientesModel
    {
        [Key]
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int EmpresaId { get; set; }
        public EmpresasModel empresa { get; set; }
        public ICollection<ProyectosModel> Proyectos { get; set; }
    }
}
