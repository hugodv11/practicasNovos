using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi2.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreApi2.Features.Trabajadores
{

    [Route("api/Trabajadores")]
    [ApiController]
    public class TrabajadoresController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public TrabajadoresController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Trabajadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrabajadoresModel>>> GetTrabajadores()
        {

            return await _context.Trabajadores.Include(trabajador => trabajador.Partes).ToListAsync();
        }

        // GET: api/Trabajadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrabajadoresModel>> GetTrabajadores(int id)
        {
            var trabajadores = await _context.Trabajadores.Include(trabajador => trabajador.Partes).FirstOrDefaultAsync(x => x.Id == id);

            if (trabajadores == null)
            {
                return NotFound();
            }

            return trabajadores;
        }

    }//end class TrabajadoresController
}
