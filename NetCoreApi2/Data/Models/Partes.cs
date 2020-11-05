using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreApi2.Data.Models
{
    public class PartesModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime FechaEntrada { get; set; }
        public DateTime FechaSalida { get; set; }
        public int ProyectoId { get; set; }  
        public int TrabajadorId { get; set; }  
        public TrabajadoresModel trabajador { get; set; } 
        [ForeignKey("ProyectoId")]
        public ProyectosModel proyecto { get; set; } 

    }
}
