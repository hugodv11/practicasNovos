import {PartesModel, PartesInterface} from "@/features/Partes/models/partes.ts";

export interface TrabajadoresInterface{
    id: number;
    codigo: string;
    nombre: string;
    partes: PartesModel[];
   
}//end interface

export class TrabajadoresModel{
    public id: number;
    public codigo: string;
    public nombre: string;
    public partes: PartesModel[];
    public newPartes: PartesModel[] = [];
    constructor()
    constructor(data: TrabajadoresInterface)
    constructor(data?: TrabajadoresInterface){
        if(typeof data !== 'undefined')
        {
            this.id = data.id;
            this.codigo = data.codigo;
            this.nombre = data.nombre;
            //this.partes = data.partes; //Necesito llamar al constructor
            data.partes.forEach(parte => {
                this.newPartes.push(new PartesModel({
                    id: parte.id,
                    fechaEntrada: parte.fechaEntrada.toString(),
                    fechaSalida: parte.fechaSalida.toString(),
                    proyectoId: parte.proyectoId,
                    trabajadorId: parte.trabajadorId,
                }))
            });
            this.partes = this.newPartes; 
        }
        else{
            this.id = 0;
            this.codigo = "";
            this.nombre = "";
            this.partes = [];
        }
    }
}