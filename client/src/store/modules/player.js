const state = {
	playing: null,
	volume: 100
}

const getters = {}

const mutations = {
	PLAYING_SET(state, id) {
		state.playing = id
	}
}

const actions = {
	setPlaying({ commit }, id) {
		commit('PLAYING_SET', id)	
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}