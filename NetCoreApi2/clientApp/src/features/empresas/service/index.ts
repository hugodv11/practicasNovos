import axios from 'axios'
import {EmpresasModel, EmpresasInterface} from "@/features/empresas/models/empresas.ts"; 

export default{
    async getEmpresaById(id: number){
        const response = await axios.get(`/Empresas/${id}`); 
        return new EmpresasModel(response.data);
    },

    async getEmpresasList(){
        const response = await axios.get<EmpresasInterface[]>("/Empresas");
        return response.data.map(empresa => {
            return new EmpresasModel(empresa);
        });
    },

    async deleteEmpresa(id: number){
        const response = await axios.delete(`/Empresas/${id}`);
        return response.status;
    },

}//end export default 