import { createRouter, createWebHistory } from 'vue-router'
import Map from "../components/Map/Map"
import Play from "../pages/Play.vue";
import Home from "../pages/Home.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/Map', component: Map },
    { path: '/Play', component: Play },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router