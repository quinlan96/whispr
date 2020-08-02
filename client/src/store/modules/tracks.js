const state = {
    tracks: []
}

const getters = {
    tracks: state => state.tracks
}

const mutations = {
    TRACKS_SET(state, tracks) {
        state.tracks = tracks
	},
	TRACK_SET(state, track) {
		const index = state.tracks.findIndex(track => track.id == track.id)

		track.title = "Dick"

		state.tracks[index] = track

		console.log(state)
	}
}

const actions = {
	updateTracks({ commit }, tracks) {
		commit('TRACKS_SET', tracks)
	},
	updateTrack({ commit }, track) {
		commit('TRACK_SET', track)
	}
}

export default {
    state,
    getters,
    mutations,
    actions
}