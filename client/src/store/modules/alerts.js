const state = {
    alerts: []
}

const getters = {
    alerts: state => state.alerts
}

const mutations = {
    ALERTS_ADD(state, alert) {
        state.alerts.push(alert)
    },
    ALERTS_REMOVE_ALL(state) {
        state.alerts = []
    }
}

const actions = {
    async addAlert({ commit }, alert) {
        commit('ALERTS_ADD', alert)
    },
    async clearAlerts({ commit }) {
        commit('')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}