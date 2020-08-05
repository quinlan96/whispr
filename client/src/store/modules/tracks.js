const defaultTrack = {
	playing: false,
	current: 0,
	data: null
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
		const track = defaultTrack

		track.data = data

		commit('TRACK_ADD', track)
	}
}

export default {
    state,
    getters,
    mutations,
    actions
}