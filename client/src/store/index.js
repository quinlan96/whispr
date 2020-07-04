import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import alerts from './modules/alerts'

Vue.use(Vuex)

const store = {
    modules: {
        auth,
        alerts
    }
}

export default new Vuex.Store(store)