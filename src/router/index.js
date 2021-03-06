import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/Login',
        name: 'Login',
        component: Login
    }, {
        path: '/Signup',
        name: 'Signup',
        component: Signup
    }, {
        path: '/Home',
        name: 'Home',
        component: Home
    }]
})
