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
    ALERTS_REMOVE(state, index) {
        if(index > -1) {
            state.alerts.splice(index, 1)
        }
    },
    ALERTS_REMOVE_ALL(state) {
        state.alerts = []
    }
}

const actions = {
    addAlert({ commit }, alert) {
        commit('ALERTS_ADD', alert)
    },
    removeAlert({ commit}, index) {
        commit('ALERTS_REMOVE', index)
    },
    clearAlerts({ commit }) {
        commit('ALERTS_REMOVE_ALL')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}