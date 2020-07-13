import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import User from '@/views/user/User'
import Upload from '@/views/user/Upload'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
	{
		path: '/u/:user',
		name: 'User',
		component: User
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta: {
            auth: true,
            roles: [
                'USER'
            ]
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
        if(!store.state.auth.loggedIn) {
            next({
                name: 'Login',
                query: { redirectTo: to.fullpath }
            })
        } else {
            const routeRoles = to.matched.map(record => record.meta.roles).flat(1)
            const userRoles = store.state.auth.user.roles

            if(!routeRoles.filter(value => userRoles.includes(value)).length) {
                next({
                    path: '/'
                })
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router
