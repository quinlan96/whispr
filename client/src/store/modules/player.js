const state = {
	audio: null,
	volume: 100,
	playing: null,
	track: {}
}

const getters = {
	audioCurrent(state) {
		return state.audio.currentTime
	}
}

const mutations = {
	PLAYER_AUDIO_SET(state, audio) {
		state.audio = audio
	},
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
	PLAYER_AUDIO_PLAY(state) {
		state.audio.play()
	}
}

const actions = {
	loadPlayer({ commit, dispatch }, track) {
		commit('PLAYER_PLAYING_SET', track.data.id)
		commit('PLAYER_TRACK_SET', track)

		const audio = new Audio(track.data.trackUrl)

		audio.ontimeupdate = () => {
			dispatch('updateCurrent', track.data.id)
			dispatch('updateTrackCurrent', track.data.id)
		}

		commit('PLAYER_AUDIO_SET', audio)
	},
	updateCurrent({ commit, rootGetters }) {
		commit('PLAYER_TRACK_CURRENT_SET', rootGetters.audioCurrent)
	},
	updatePlayer({ commit }, track) {
		commit('PLAYER_TRACK_SET', track)
	},
	playPlayer({ commit }, id) {
		commit('PLAYER_PLAYING_SET', id)
		commit('PLAYER_AUDIO_PLAY')
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}