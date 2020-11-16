import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import navBar from "@/components/navigation-bar/index.vue";
import empresasRoutes from "@/features/empresas/routes.ts";
import trabajadoresRoutes from "@/features/trabajadores/routes.ts";
import partesRoutes from "@/features/Partes/routes.ts";
import store from '@/store';
import Login from '@/components/login/index.vue';

const ifAuthenticated = (to:any, from:any, next:any) =>{
    if(store.getters.isAuthenticated){
        next()
        return
    }
    next('/login')
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: navBar,
        beforeEnter: ifAuthenticated,
        children: [
            empresasRoutes.routes,
            trabajadoresRoutes.routes,
            partesRoutes.routes,
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
