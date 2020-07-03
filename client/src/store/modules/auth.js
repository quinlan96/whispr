import { get, post } from '@/services/api'
import { getToken, setToken, removeToken, tokenExists } from '@/services/token'
import ApiError from '@/services/api/ApiError'

const user = {
    id: null,
    username: '',
    roles: []
}

const state = {
    token: getToken() || null,
    loggedIn: tokenExists(),
    user: user
}

const getters = {
    token: state => state.token,
    loggedIn: state => state.loggedIn,
    user: state => state.user,
    roles: state => state.user.roles
}

const mutations = {
    AUTH_LOGIN(state, { token, user }) {
        state.token = token
        state.user = user
        state.loggedIn = true
    },
    AUTH_LOGOUT(state) {
        state.token = null
        state.user = user
        state.loggedIn = false
    }
}

const actions = {
    async login({ commit }, loginData) {
        try {
            const { token, user } = await post('/auth/login', loginData)

            setToken(token)

            commit('AUTH_LOGIN', { token, user })
        } catch(e) {
            throw new ApiError(401, e.message)
        }
    },
    async logout({ commit }) {
        removeToken()
        commit('AUTH_LOGOUT')
	},
	async signup(context, signupData) {
		try {
			await post('/auth/signup', signupData)
		} catch(e) {
			throw new ApiError(e.status, e.message)
		}
	},
    async verifyToken({ commit }) {
        try {
            const user = await get('/auth/get-user')

            commit('AUTH_LOGIN', {
                token: getToken(),
                user: user
            })
        } catch(e) {
            throw new ApiError(401, e.message)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}