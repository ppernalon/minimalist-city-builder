import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "../pages/HelloWorld";
import Map from "../components/Map/Map"

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/Map', component: Map },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router