using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi2.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreApi2.Features.Proyectos
{
    [Route("api/Proyectos")]
    [ApiController]
    public class ProyectosController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public ProyectosController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Proyectos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProyectosModel>>> GetProyectos()
        {
            return await _context.Proyectos.ToListAsync();
        }

        // GET: api/Proyectos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProyectosModel>> GetProyectos(int id)
        {
            var proyectos = await _context.Proyectos.FindAsync(id);

            if (proyectos == null)
            {
                return NotFound();
            }

            return proyectos;
        }

    }//end class ProyectosController
}
