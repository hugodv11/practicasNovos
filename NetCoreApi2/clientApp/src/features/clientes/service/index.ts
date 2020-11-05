import axios from 'axios';
import {ClientesModel, ClientesInterface} from "@/features/clientes/models/clientes.ts";


export default{

    async getClientesList(){
        const response = await axios.get<ClientesInterface[]>("/Clientes");
        return response.data.map(cliente =>{
            return new ClientesModel(cliente)
        });
    },

    async getClienteById(id: number){
        const response = await axios.get(`/Clientes/${id}`);
        return new ClientesModel(response.data);
    }


}