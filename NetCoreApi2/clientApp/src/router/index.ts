import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import navBar from "@/components/navigation-bar/index.vue";
import empresasRoutes from "@/features/empresas/routes.ts";
import trabajadoresRoutes from "@/features/trabajadores/routes.ts";
import partesRoutes from "@/features/Partes/routes.ts";
import store from '@/store';

// const ifAuthenticated = (to:any, from:any, next:any) =>{
//     if(store.getters.isAuthenticated){
//         next()
//         return
//     }
//     next('/api/login')
// }

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: navBar,
        // beforeEnter: ifAuthenticated,
        children: [
            empresasRoutes.routes,
            trabajadoresRoutes.routes,
            partesRoutes.routes,
        ]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
