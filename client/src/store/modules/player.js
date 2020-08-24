import Vue from 'vue'

import { DEFAULT_TRACK } from '@/constants'

function getDefaultPlayer() {
	return {
		seek: 0,
		seekDragging: false,
		volume: 100,
		playing: null,
		track: { ...DEFAULT_TRACK }
	}
}

const state = getDefaultPlayer()

const getters = {
	getCurrentTrack: state => state.track,
	getPlaying: state => state.playing
}

const mutations = {
	PLAYER_RESET(state) {
		const player = getDefaultPlayer()

		Object.keys(state).forEach(key => {
			Vue.set(state, key, player[key])
		})
	},
	PLAYER_PLAYING_SET(state, id) {
		state.playing = id
	},
	PLAYER_TRACK_SET(state, track) {
		state.track = track
	},
	PLAYER_TRACK_CURRENT_SET(state, current) {
		state.track.current = current

		if(!state.seekDragging) {
			state.seek =  (current / state.track.data.duration) * 1000
		}
	},
	PLAYER_TRACK_PROGRESS_SET(state, progress) {
		const current = (progress * state.track.data.duration)

		state.track.setCurrent = current
	},
	PLAYER_TRACK_PLAYING_SET(state, playing) {
		state.track.playing = playing
	},
	PLAYER_SEEK_DRAGGING_SET(state, dragging) {
		state.seekDragging = dragging
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
		commit('PLAYER_TRACK_PLAYING_SET', true)
	},
	pausePlayer({ commit }) {
		commit('PLAYER_TRACK_PLAYING_SET', false)
	},
	stopPlayer({ commit, dispatch, rootGetters }) {
		dispatch('stopTrack', rootGetters.getPlaying)
		commit('PLAYER_RESET')
	},
	updateSeekDragging({ commit }, dragging) {
		commit('PLAYER_SEEK_DRAGGING_SET', dragging)
	},
	setTrackProgress({ commit }, progress) {
		commit('PLAYER_TRACK_PROGRESS_SET', progress)
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}