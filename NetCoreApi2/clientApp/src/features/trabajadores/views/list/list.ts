import { Options, Vue } from "vue-class-component";
import Service from "@/features/trabajadores/service/index.ts";

Options({})
export default class List extends Vue{
    trabajadores: any = []
    busy = false;
    


    async created(){
        this.busy = true;
        try{
            this.trabajadores = await Service.getTrabajadoresList();
        } finally{
            this.busy = false;
        }
    }//end method created

}//end class List