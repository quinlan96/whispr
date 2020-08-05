const state = {
	audio: null,
	volume: 100,
	playing: null,
	track: {}
}

const getters = {}

const mutations = {
	AUDIO_SET(state, audio) {
		state.audio = audio
	},
	PLAYING_SET(state, id) {
		state.playing = id
	},
	TRACK_SET(state, track) {
		state.track = track
	},
	CURRENT_SET(state) {
		state.track.current = state.audio.currentTime
	},
	AUDIO_PLAY(state) {
		state.audio.play()
	}
}

const actions = {
	loadTrack({ commit }, track) {
		commit('PLAYING_SET', track.data.id)
		commit('TRACK_SET', track)

		const audio = new Audio(track.data.trackUrl)

		audio.ontimeupdate = () => {
			commit('CURRENT_SET')
		}

		commit('AUDIO_SET', audio)
	},
	playTrack({ commit }, id) {
		commit('PLAYING_SET', id)
		commit('AUDIO_PLAY')
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}