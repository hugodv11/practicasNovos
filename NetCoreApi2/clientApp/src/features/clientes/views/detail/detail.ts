import { Options, Vue } from "vue-class-component";
import Service from "@/features/clientes/service/index.ts";
import {Watch} from "vue-property-decorator";

@Options({})
export default class List extends Vue{
    clienteId = 0;
    cliente:any;
    busy = false;

    get paramClienteId(){
        return this.$route.params.clienteId;
    }

    @Watch('paramClienteId')
    onPropertyChanged(value:string, oldValue: string){
        this.clienteId = parseInt(value);
        this.loadCliente();
    }

    async loadCliente(){
        this.busy = true;
        try{
            this.cliente = await Service.getClienteById(this.clienteId);
        } finally{
            this.busy = false;
        }
    }//end method loadCliente

    async created(){
        this.clienteId = parseInt(this.$route.params.clienteId as string);
        this.loadCliente();
    }
}