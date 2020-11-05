import axios from 'axios'
import {TrabajadoresModel, TrabajadoresInterface} from "@/features/trabajadores/models/trabajadores.ts";

export default{
    async getTrabajadoresList(){
        const response = await axios.get<TrabajadoresInterface[]>("/Trabajadores");
        return response.data.map(trabajador => {
            return new TrabajadoresModel(trabajador);
        });
    },

    async getTrabajadorById(id: number){
        const response = await axios.get(`/Trabajadores/${id}`);
        return new TrabajadoresModel(response.data);
    },

    

}//end export default