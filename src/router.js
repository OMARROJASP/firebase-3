import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from "./stores/users.js";

import Home from "./components/Home.vue"
import Register from "./components/Register.vue"
import Login from "./components/Login.vue"
import Editar from "./components/Editar.vue"

const requireAuth = async (to, from ,next) => {
    const userStore = useUserStore();

    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user){
        next()
    }else{
        next("/login")
    }
}


const routes = [
    {path:"/", component: Home, beforeEnter: requireAuth },
    { path: "/editar/:id", component: Editar, beforeEnter: requireAuth },
    {path:"/login", component: Login},
    {path:"/register", component: Register},
]

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
})

export default router;