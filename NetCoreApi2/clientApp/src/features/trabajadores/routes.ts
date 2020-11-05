import TrabajadoresList from "@/features/trabajadores/views/list/index.vue";
import TrabajadorDetail from "@/features/trabajadores/views/detail/index.vue";
import { Options } from 'vue-class-component';

Options({})
export default {
    routes: 
        {
            path: "trabajadores",
            name: "trabajadores",
            component: TrabajadoresList,
            children: [
                {
                    path: ":trabajadorId",
                    name: "trabajadorDetail",
                    component: TrabajadorDetail,
                }
            ]
        },
    
}//end export default


    
    
