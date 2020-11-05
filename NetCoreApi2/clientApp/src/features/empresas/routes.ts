import { Options } from "vue-class-component";
import EmpresasWrapper from "@/features/empresas/empresas-wrapper.vue";
import Empresas from "@/features/empresas/views/Detail/index.vue";
import Cliente from "@/features/clientes/views/detail/index.vue";
import CreateEmpresa from "@/features/empresas/views/CreateEmpresa/index.vue";

Options({})
export default {
    routes:
    {
        path: "empresas",
        name: "empresas",
        component: EmpresasWrapper,
        children: [
            {
                path: ":empresaId",
                name: "empresa",
                component: Empresas,
                children: [
                    {
                        path: ":clienteId/proyectos",
                        name: "clienteProyectos",
                        component: Cliente,
                    }
                ]
            },
            {
                path: "crearEmpresa",
                name: "createEmpresa",
                component: CreateEmpresa
            },
        ],
    },
}//end export default 