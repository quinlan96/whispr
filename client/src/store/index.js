import Vue from 'vue'
import Vuex from 'vuex'

import { get } from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async fetchUser({ commit }) {
            const { user } = await get('/auth/get-user')

            commit('setUser', user)
        }

    },
    modules: {
    }
})
