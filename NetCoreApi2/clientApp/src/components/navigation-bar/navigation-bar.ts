import { Options, Vue } from "vue-class-component";
import Service from "@/features/empresas/service/index.ts";
import {EmpresasModel} from "@/features/empresas/models/empresas.ts";
import {Watch} from "vue-property-decorator";

@Options({})
export default class NavigationBar extends Vue{
    empresas: EmpresasModel[] = [];
    busy = false;
    isEmpresa = false;
    public selectedEmpresa = ""; //Esto es siempre el nombre de la empresa

    @Watch('$route')
    onUrlChange(){
        this.displayEmpresas();    
    }

    async displayEmpresas(){
        if(this.$route.path.indexOf("/empresas") >= 0){
            this.isEmpresa = true;
        }
        else{
            this.isEmpresa = false;
        }
    }

    async createEmpresa(){
        await this.$router.push({name: "createEmpresa"})
    }

    async changeEmpresa(){
        let id = 0;
        for(const empresa of this.empresas){
            if(empresa.nombre === this.selectedEmpresa){
                id = empresa.id
            }
        }
        await this.$router.replace({name: "empresa", params: {empresaId: id}})
    }
    
    async created(){
        this.busy = true;
        try{
            this.empresas = await Service.getEmpresasList();

        } finally{
            this.busy = false;
        }
    }
}