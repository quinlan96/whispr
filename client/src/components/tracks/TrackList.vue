<template>
    <div>
        <div v-if="tracks.length">
            <Track
                v-for="track in tracks"
                :key="track.id"
                :track="track"
                :currentTrack="playing"
                @update-track="updatePlaying"
            />
        </div>
        <div v-else class="has-text-centered">
            <span>No tracks found</span>
        </div>
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
