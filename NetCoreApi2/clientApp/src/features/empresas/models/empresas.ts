import {ClientesModel} from "@/features/clientes/models/clientes.ts";

export interface EmpresasInterface {
    id: number;
    nombre: string;
    cif: string;
    clientes: ClientesModel[];
}//end interface

export class EmpresasModel{
    id: number;
    nombre: string;
    cif: string;
    clientes: ClientesModel[];

    constructor(data: EmpresasInterface){
        this.id = data.id;
        this.nombre = data.nombre;
        this.cif = data.cif;
        this.clientes = data.clientes;
    }//end constructor
}//end class EmpresasModel