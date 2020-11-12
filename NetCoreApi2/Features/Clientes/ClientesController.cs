using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi2.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace NetCoreApi2.Features.Clientes
{
    [Route("api/Clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        public ClientesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientesModel>>> GetClientes()
        {
            return await _context.Clientes.Include(cliente => cliente.Proyectos).ToListAsync();
        }

        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientesModel>> GetClientes(int id)
        {
            var clientes = await _context.Clientes.Include(cliente => cliente.Proyectos).FirstOrDefaultAsync(x => x.Id == id);

            if (clientes == null)
            {
                return NotFound();
            }

            return clientes;
        }
    }
}
