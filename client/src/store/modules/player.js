import { DEFAULT_TRACK } from '@/constants'

const state = {
	volume: 100,
	playing: null,
	track: DEFAULT_TRACK
}

const getters = {}

const mutations = {
	PLAYER_PLAYING_SET(state, id) {
		state.playing = id
	},
	PLAYER_TRACK_SET(state, track) {
		state.track = track
	},
	PLAYER_TRACK_CURRENT_SET(state, current) {
		state.track.current = current
	},
	PLAYER_CURRENT_SET(state) {
		state.track.current = state.audio.currentTime
	},
	PLAYER_TRACK_PLAYING_SET(state, playing) {
		state.track.playing = playing
	}
}

const actions = {
	loadPlayer({ commit }, track) {
		commit('PLAYER_TRACK_SET', track)
		commit('PLAYER_PLAYING_SET', track.data.id)
	},
	updateCurrent({ commit }, current) {
		commit('PLAYER_TRACK_CURRENT_SET', current)
	},
	updatePlayer({ commit }, track) {
		commit('PLAYER_TRACK_SET', track)
	},
	playPlayer({ commit }) {
		commit('PLAYER_TRACK_PLAYING_SET')
	},
	pausePlayer({ commit }) {
		commit('PLAYER_TRAC')
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}