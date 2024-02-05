import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import VuePageTransition from 'vue-page-transition'
import axios, { ACCESS_TOKEN_LIFETIME } from '@/plugins/axios'

import Home from '@/components/Home'
import Login from '@/components/Login'
import User from '@/components/User'
import SignUp from '@/components/SignUp'
import Landing from '@/components/Landing'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import EmailConfirmation from '@/components/EmailConfirmation'

Vue.use(Router)
Vue.use(VuePageTransition)

const isAuthenticated = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

const isGuest = (to, from, next) => {
    if (!store.getters['user/isLoggedIn']) {
        next()
    } else {
        next({ name: 'User' })
    }
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: { render: (h) => store.getters['user/isLoggedIn'] ? h(Home) : h(Landing) },
            meta: { title: "Home" }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: isGuest,
            meta: { title: "Login" }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            beforeEnter: isGuest,
            meta: { title: "Forgot Password" }
        },
        {
            path: '/reset-password/:uid/:token',
            name: 'ResetPassword',
            component: ResetPassword,
            beforeEnter: isGuest,
            meta: { title: "Reset Password" }
        },
        {
            path: '/sign-up',
            name: 'Sign up',
            component: SignUp,
            beforeEnter: isGuest,
            meta: { title: "Sign up" }
        },
        {
            path: '/confirm-registration/:key',
            name: 'EmailConfirmation',
            component: EmailConfirmation,
            beforeEnter: isGuest,
            meta: { title: "Confirm Registration" }
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            beforeEnter: isAuthenticated,
            meta: { title: "User" }
        },
        {
            path: '/logout',
            name: 'Logout',
            beforeEnter: async (to, from, next) => {
                await store.dispatch('user/logout')
                next({ name: 'Home' })
            }
        }
    ]
})

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    const token = store.getters['user/getAccessToken']
    if (token && !axios.defaults.headers.common.Authorization) {
        if (new Date().getTime() - store.getters['user/getLastRefreshSince'] < ACCESS_TOKEN_LIFETIME) {
            axios.defaults.headers.common = {Authorization: `Bearer ${token}`}
            store.dispatch('user/set_timeout_for_refresh', new Date().getTime() - store.getters['user/getLastRefreshSince'])
        } else {
            await store.dispatch('user/refresh_token')
        }
    }
    next()
}
router.beforeEach(waitForStorageToBeReady)
router.afterEach(to => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta ? `${to.meta.title} | TrackWay` : 'TrackWay'
    })
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.data && error.response.data.code === 'token_not_valid') {
            store.dispatch('user/clear_auth')
            router.push({name: 'Login'})
        }
        return Promise.reject(error)
    }
)

export default router
