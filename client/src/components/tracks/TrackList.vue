<template>
    <div>
        <h1 class="title">Latest Tracks</h1>
		<Track v-for="track in tracks" :key="track.id" :track="track" :currentTrack="playing" @on-play-track="updatePlaying" />
    </div>
</template>

<script>
import Track from './Track.vue'

export default {
	name: 'Navbar',
	props: [
		'tracks'
	],
	data() {
		return {
			playing: null
		}
	},
	methods: {
		updatePlaying(id) {
			this.playing = id
		}
	},
	components: {
		Track
	}
}
</script>

<style scoped lang="scss">
</style>
