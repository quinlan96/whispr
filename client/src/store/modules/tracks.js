import Vue from 'vue'
import { DEFAULT_TRACK } from '@/constants'

function getDefaultTrack() {
	return { ...DEFAULT_TRACK }
}

const getTrack = (tracks, id) => {
	return tracks.findIndex(track => track.data.id == id)
}

const state = {
    tracks: []
}

const getters = {}

const mutations = {
    TRACKS_SET(state, tracks) {
        state.tracks = tracks
	},
	TRACK_ADD(state, track) {
		state.tracks.push(track)
	},
	TRACK_DATA_SET(state, data) {
		const index = getTrack(state.tracks, data.id)

		const track = state.tracks[index]
		
		track.data = data

		Vue.set(state.tracks, index, track)
	},
	TRACK_RESET(state, id) {
		const track = getDefaultTrack()	
		
		const index = getTrack(state.tracks, id)

		track.data = state.tracks[index].data

		Vue.set(state.tracks, index, track)
	},
	TRACK_PLAYING_SET(state, { id, playing }) {
		const index = getTrack(state.tracks, id)

		const track = state.tracks[index]

		track.playing = playing

		Vue.set(state.tracks, index, track)
	},
	TRACK_CURRENT_SET(state, { id, current }) {
		const index = getTrack(state.tracks, id)	

		if(index > 0) {
			const track = state.tracks[index] 

			track.current = current

			Vue.set(state.tracks, index, track)
		}
	}
}

const actions = {
	addTracks({ dispatch, commit }, tracks) {
		commit('TRACKS_SET', [])

		tracks.map((track) => {
			dispatch('addTrack', track)
		})
	},
	addTrack({ commit, rootGetters }, data) {
		if(data.id == rootGetters.getPlaying) {
			commit('TRACK_ADD', rootGetters.getCurrentTrack)
		} else {
			const track = getDefaultTrack()

			track.data = data

			commit('TRACK_ADD', track)
		}
	},
	updateTrackData({ commit }, track) {
		commit('TRACK_DATA_SET', track)
	},
	playTrack({ commit }, id) {
		commit('TRACK_PLAYING_SET', { id: id, playing: true })
	},
	pauseTrack({ commit }, id) {
		commit('TRACK_PLAYING_SET', { id: id, playing: false })
	},
	stopTrack({ commit }, id) {
		commit('TRACK_RESET', id)
	},
	updateTrackCurrent({ commit }, { id, current }) {
		commit('TRACK_CURRENT_SET', {
			id: id,
			current: current
		})
	}
}

export default {
    state,
    getters,
    mutations,
    actions
}