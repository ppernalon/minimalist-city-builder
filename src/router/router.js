import { createRouter, createWebHistory } from 'vue-router'
import Map from "../components/Map/Map"
import Play from "../pages/Play";
import Home from "../pages/Home";

const routes = [
    { path: '/', component: Home },
    { path: '/Map', component: Map },
    { path: '/Play', component: Play },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router