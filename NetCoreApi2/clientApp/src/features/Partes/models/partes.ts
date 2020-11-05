import {DateTime} from "luxon";

export interface PartesInterface {
    id: number;
    fechaEntrada: string;
    fechaSalida: string;
    proyectoId: number;
    trabajadorId: number;
}//end interface

export interface PartesInterfaceWithDates {
    id: number;
    fechaEntrada: DateTime;
    fechaSalida: DateTime;
    proyectoId: number;
    trabajadorId: number;
}//end interface

export class PartesModel{
    id: number;
    fechaEntrada: DateTime;
    fechaSalida: DateTime;
    proyectoId: number;
    trabajadorId: number;
    constructor()
    constructor(data: PartesInterface)
    constructor(data?: PartesInterface){
        if(typeof data !== 'undefined'){
            this.id = data.id;
            this.fechaEntrada = DateTime.fromISO(data.fechaEntrada + "Z");
            this.fechaSalida = DateTime.fromISO(data.fechaSalida + "Z");
            this.proyectoId = data.proyectoId;
            this.trabajadorId = data.trabajadorId;
        }
        else{
            this.id = 0;
            this.fechaEntrada = DateTime.local();
            this.fechaSalida = DateTime.local();
            this.proyectoId = 0;
            this.trabajadorId = 0;
        }
    }
}

export class NewParteRequest {
    fechaEntrada: string;
    fechaSalida?: string;
    proyectoId: number;
    trabajadorId: number;

    public constructor(data: PartesModel) {
        
        if (!data.fechaEntrada.isValid) {
            throw new Error(`Invalid date while creating NewParteRequest: ${data.fechaEntrada}`);
        }

        this.fechaEntrada = data.fechaEntrada.toISO();
        this.fechaSalida = data.fechaSalida ? data.fechaSalida.toISO() : undefined;
        this.proyectoId = data.proyectoId;
        this.trabajadorId = data.trabajadorId;
    }
}