using FluentValidation;
using NetCoreApi2.Data.Models;
using System;
namespace NetCoreApi2.Features.Partes.Requests
{
    public class CreateParteRequestValidator : AbstractValidator<PartesModel>
    {
        public CreateParteRequestValidator()
        {
            RuleFor(p => p.FechaEntrada).NotEmpty().WithMessage("Por favor introduzca una fecha valida");
            RuleFor(p => p.FechaSalida).NotEmpty().WithMessage("Por favor introduzca una fecha valida");
            RuleFor(p => p.ProyectoId).NotEmpty();
            RuleFor(p => p.TrabajadorId).NotEmpty();
        }
    }
}
