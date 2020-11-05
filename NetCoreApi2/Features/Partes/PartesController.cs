using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreApi2.Data.Models;
using NetCoreApi2.Features.Partes.Requests;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreApi2.Features.Partes
{
    [Route("api/Partes")]
    [ApiController]
    public class PartesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public PartesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Partes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartesModel>>> GetPartes()
        {
            return await _context.Partes.ToListAsync();
        }

        // GET: api/Partes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PartesModel>> GetPartes(int id)
        {
            var partes = await _context.Partes.FindAsync(id);
            if (partes == null)
            {
                return NotFound();
            }
            return partes;
        }

        // PUT: api/Partes/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PartesModel>> UpdateParte(PartesModel toUpdate) //Hace falta tener en cuenta que el nuevo parte no puede pisar el tiempo de otro
        {
            var parte = await _context.Partes.FirstOrDefaultAsync(parte => parte.Id == toUpdate.Id);
            if(parte != null)
            {
                _context.Entry(parte).CurrentValues.SetValues(toUpdate);
                await _context.SaveChangesAsync();
                return Ok(toUpdate);
            }
            return BadRequest("No se ha podido realizar la operación");
        }

        // POST: api/Partes
        [HttpPost]
        public async Task<ActionResult<PartesModel>> CreateParte(PartesModel parte)
        {
            var parteRequestValidation = new CreateParteRequestValidator();
            var validationResult = parteRequestValidation.Validate(parte);
            if (validationResult.IsValid)
            {
                if (DateValidations(parte))
                {
                    DateTime dt = parte.FechaEntrada.ToUniversalTime();
                    DateTime dt2 = parte.FechaSalida.ToUniversalTime();
                    parte.FechaEntrada = dt;
                    parte.FechaSalida = dt2;
                    _context.Partes.Add(parte);
                    await _context.SaveChangesAsync();
                    return Ok(parte);
                }
                else { return BadRequest("Las fechas son incorrectas"); }
            }
            else { return BadRequest("No has pasado las validaciones"); }
        } 


        public bool DateValidations(PartesModel newParte)
        {
            List<PartesModel> toCompare = new List<PartesModel>();
            foreach (PartesModel p in _context.Partes)
            {
                if (p.FechaEntrada.Day == newParte.FechaEntrada.Day && p.TrabajadorId == newParte.TrabajadorId)
                {
                    toCompare.Add(p);
                }
            }
            if (toCompare.Count > 0)
            {
                foreach (PartesModel p in toCompare)
                {
                    TimeSpan horaEntradaSecs = new TimeSpan(p.FechaEntrada.Hour, p.FechaEntrada.Minute, 0);
                    TimeSpan horaSalidaSecs = new TimeSpan(p.FechaSalida.Hour, p.FechaSalida.Minute, 0);
                    TimeSpan newHoraEntradaSecs = new TimeSpan(newParte.FechaEntrada.Hour, newParte.FechaEntrada.Minute, 0);
                    TimeSpan newHoraSalidaSecs = new TimeSpan(newParte.FechaSalida.Hour, newParte.FechaSalida.Minute, 0);
                    if(newHoraEntradaSecs.TotalSeconds > horaEntradaSecs.TotalSeconds)
                    {
                        if (horaSalidaSecs > newHoraEntradaSecs)
                        {
                            return false;  
                        }
                    }
                    else
                    {
                        if(newHoraEntradaSecs < horaEntradaSecs)
                        {
                            if(horaEntradaSecs < newHoraSalidaSecs)
                            {
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
            else { return true; } 
        }
    } 
}
