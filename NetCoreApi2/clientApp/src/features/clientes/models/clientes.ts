import {ProyectosModel} from "@/features/proyectos/models/proyectos.ts";

export interface ClientesInterface {
    id: number;
    codigo: string;
    nombre: string;
    empresasId: number;
    proyectos: ProyectosModel[];
}//end interface

export class ClientesModel{
    id: number;
    codigo: string;
    nombre: string;
    empresaId: number;
    proyectos: ProyectosModel[];

    constructor(data: ClientesInterface){
        this.id = data.id;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.empresaId = data.empresasId;
        this.proyectos = data.proyectos;
    }//end constructor
}//end class Clientes