<template>
	<div class="container tracklist">
		<h1 class="title">Latest Tracks</h1>
		<TrackList :tracks="tracks.tracks" :loading="tracks.loading" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

import TrackList from '@/components/tracks/TrackList.vue'

export default {
	name: 'Home',
	computed: mapState([
		'tracks'
	]),
	async mounted() {
		this.$store.dispatch('fetchTracks')
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
