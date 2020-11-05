export interface ProyectosInterface{
    id: number;
    nombre: string;
    clientesId: number;
}//end interface

export class ProyectosModel{
    id: number;
    nombre: string;
    clienteId: number;

    constructor(data: ProyectosInterface){
        this.id = data.id;
        this.nombre = data.nombre;
        this.clienteId = data.clientesId;
    }//end constructor
}//end class ProyectosModel