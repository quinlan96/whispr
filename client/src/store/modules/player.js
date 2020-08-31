import Vue from 'vue'

import { DEFAULT_TRACK } from '@/constants'

function getDefaultPlayer() {
	return {
		seek: 0,
		seekDragging: false,
		volume: 100,
		setVolume: null,
		volumePrevious: 100,
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
	PLAYER_VOLUME_SET(state, volume) {
		state.volume = volume
	},
	PLAYER_VOLUMEPREVIOUS_SET(state, volume) {
		state.volumePrevious = volume
	},
	PLAYER_TRACK_CURRENT_SET(state, current) {
		state.track.current = current

		if(!state.seekDragging) {
			state.seek =  (current / state.track.data.duration) * 1000
		}
	},
	PLAYER_TRACK_SETCURRENT_SET(state, current) {
		if(current <=  0) {
			state.track.setCurrent = 0
			return
		}

		if(current > state.track.data.duration) {
			state.track.setCurrent = state.track.data.duration
			return
		}

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
	loadPlayer({ commit, dispatch, rootGetters }, track) {
		const playing = rootGetters.getPlaying

		if(playing > 0) {
			dispatch('stopTrack', rootGetters.getPlaying)
		}

		commit('PLAYER_RESET')
		commit('PLAYER_TRACK_SET', track)
		commit('PLAYER_PLAYING_SET', track.data.id)
		commit('PLAYER_TRACK_PLAYING_SET', true)
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
	updateVolume({ commit }, volume) {
		commit('PLAYER_VOLUME_SET', volume)
	},
	updateVolumePrevious({ commit }, volume) {
		commit('PLAYER_VOLUMEPREVIOUS_SET', volume)
	},
	updateSeekDragging({ commit }, dragging) {
		commit('PLAYER_SEEK_DRAGGING_SET', dragging)
	},
	setTrackProgress({ commit }, progress) {
		const current = (progress * state.track.data.duration)

		commit('PLAYER_TRACK_SETCURRENT_SET', current)
	},
	setTrackCurrent({ commit }, current) {
		commit('PLAYER_TRACK_SETCURRENT_SET', current)
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}