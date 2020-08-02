import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import alerts from './modules/alerts'
import tracks from './modules/tracks'

Vue.use(Vuex)

const store = {
    modules: {
        auth,
		alerts,
		tracks
    }
}

export default new Vuex.Store(store)