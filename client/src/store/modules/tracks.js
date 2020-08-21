import Vue from 'vue'
import { DEFAULT_TRACK } from '@/constants'

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
	addTrack({ commit }, data) {
		const track = DEFAULT_TRACK

		track.data = data

		commit('TRACK_ADD', track)
	}, 
	playTrack({ commit }, id) {
		commit('TRACK_PLAYING_SET', { id: id, playing: true })
	},
	pauseTrack({ commit }, id) {
		commit('TRACK_PLAYING_SET', { id: id, playing: false })
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