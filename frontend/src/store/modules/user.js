import service from '@/services/auth'
// import store from '@/store'
import axios, { ACCESS_TOKEN_LIFETIME } from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        timeoutRef: null,
        since: null,
        accessToken: null,
        refreshToken: null,
        data: {
            id: null,
            /*firstName: null,
            lastName: null*/
        }
    },
    mutations: {
        SET_TOKENS: (state, data) => {
            state.since = new Date().getTime()
            state.accessToken = data.access_token || data.access
            axios.defaults.headers.common = {Authorization: `Bearer ${state.accessToken}`}
            state.refreshToken = data.refresh_token || data.refresh || state.refreshToken
        },
        CLEAR_DATA: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.data = {}
        },
        SET_USER: (state, data) => {
            state.data.id = data.id
            /*state.data.firstName = data.first_name
            state.data.lastName = data.last_name*/
        }
    },
    getters: {
        isLoggedIn: state => !!(state.accessToken),
        getLastRefreshSince: state => state.since,
        getAccessToken: state => state.accessToken,
        getUserData: state => state.data
    },
    actions: {
        set_timeout_for_refresh ({ state, dispatch }, timeout) {
            state.timeoutRef = setTimeout(() => { dispatch('refresh_token') }, timeout || ACCESS_TOKEN_LIFETIME)
        },
        async refresh_token ({ commit, state, dispatch }) {
            const response = await service.refresh_token(state.refreshToken)
            commit('SET_TOKENS', response.data)
            dispatch('set_timeout_for_refresh')
        },
        reset_all_services() {
            /*for (const service of [...]) {
                store.dispatch(`${service}/reset`)
            }*/
        },
        set_data ({ commit, dispatch }, response) {
            // console.log(await service.user_info())
            commit('SET_USER', response.data.user)
            commit('SET_TOKENS', response.data)
            dispatch('set_timeout_for_refresh')
            dispatch('reset_all_services')
        },
        async login ({ dispatch }, data) {
            const response = await service.login(data)
            dispatch('set_data', response)
        },
        submit_forgot_password (_, email) {
            return service.forgot_password_request(email)
        },
        submit_reset_password (_, data) {
            return service.reset_password_request(data)
        },
        async register (/*{ dispatch }*/_, data) {
            /*const response = */await service.register(data)
            // dispatch('set_data', response)
        },
        resend_email (_, email) {
            return service.resend_email(email)
        },
        confirm_email (_, key) {
            return service.confirm_email(key)
        },
        clear_auth ({ commit, state }) {
            axios.defaults.headers.common = {}
            commit('CLEAR_DATA')
            clearTimeout(state.timeoutRef)
        },
        async logout ({ state, dispatch }) {
            try {
                await service.logout(state.refreshToken)
            } catch (error) {
                console.error(error)
            }
            dispatch('clear_auth')
            dispatch('reset_all_services')
        },
        async update_user({ commit }, data) {
            const response = await service.update(data)
            commit('SET_USER', response.data)
        }
    }
}