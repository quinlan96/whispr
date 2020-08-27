<template>
	<div class="container tracklist">
		<h1 class="title">Latest Tracks</h1>
		<TrackList :tracks="tracks.tracks" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

import TrackList from '@/components/tracks/TrackList.vue'
import { get } from '@/services/api'

export default {
	name: 'Home',
	computed: mapState([
		'tracks'
	]),
	async mounted() {
		this.$store.dispatch('addTracks', await get('/tracks'))
	},
	components: {
		TrackList
	}
}
</script>

<style lang="scss" scoped>
.tracklist {
    margin-top: 1.5rem;
}
</style>
