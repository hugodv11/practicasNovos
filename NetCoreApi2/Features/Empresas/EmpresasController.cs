using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi2.Data.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreApi2.Features.Empresas
{
    [Route("api/Empresas")]
    [ApiController]
    public class EmpresasController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public EmpresasController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Empresas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpresasModel>>> GetEmpresas()
        {
            await _context.Clientes.Include(cliente => cliente.Proyectos).ToListAsync();
            return await _context.Empresas.Include(empresa => empresa.Clientes).ToListAsync();
        }

        // GET: api/Empresas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmpresasModel>> GetEmpresas(int id)
        {
            var empresas = await _context.Empresas.Include(empresa => empresa.Clientes).FirstOrDefaultAsync(x => x.Id == id);

            if (empresas == null)
            {
                return NotFound();
            }

            return empresas;
        }

        // DELETE: api/Empresas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EmpresasModel>> DeleteEmpresa(int id)
        {
            await _context.Proyectos.Include(proyecto => proyecto.Partes).ToListAsync();
            await _context.Clientes.Include(cliente => cliente.Proyectos).ToListAsync();
            var empresa = await _context.Empresas.Include(empresa => empresa.Clientes).FirstOrDefaultAsync(x => x.Id == id);
            if(empresa == null)
            {
                return NotFound("La empresa indicada no existe");
            }
            _context.Empresas.Remove(empresa);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }//end class EmpresasController 
}
