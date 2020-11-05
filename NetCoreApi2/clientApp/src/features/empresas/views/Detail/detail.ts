import { Options, Vue} from "vue-class-component";
import Service from "@/features/empresas/service/index.ts";
import {EmpresasModel} from "@/features/empresas/models/empresas.ts";
import {Watch} from "vue-property-decorator";


@Options({})
export default class Empresas extends Vue{
    empresaId = 0;
    empresa:any;
    busy = false;

    get paramEmpresaId(){
        return this.$route.params.empresaId
    }

    @Watch('paramEmpresaId')
    onPropertyChanged(value: string, oldValue: string){
        this.empresaId = parseInt(value);
        this.loadEmpresa();
    }//end Watch

    async deleteEmpresa(id: number){
        await Service.deleteEmpresa(id);
        await this.$router.push({name: "Home"})
    }

    async loadEmpresa(){
        this.busy = true;
        try{
            const empresa:EmpresasModel = await Service.getEmpresaById(this.empresaId);
            this.empresa = empresa;
        } finally {
            this.busy = false;
        }
    }//end method loadEmpresa

    async created(){
        this.empresaId = parseInt(this.$route.params.empresaId as string);
        await this.loadEmpresa();
    }//end method created
}