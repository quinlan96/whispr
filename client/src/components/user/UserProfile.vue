<template>
	<div>
		<h1 class="title">My audios</h1>
		<TrackList :tracks="tracks" />
	</div>
</template>

<script>
import { get } from '@/services/api'

import TrackList from '@/components/tracks/TrackList.vue'

export default {
	name: 'UserProfile',
	data() {
		return {
			tracks: []
		}
	},
	methods: {
		async getTracks() {
			const id = this.$store.state.auth.user.id

			console.log(id)

			this.tracks = await get(`/users/${id}/tracks`)
		}
	},
	mounted() {
		this.getTracks()
	},
	components: {
		TrackList
	}
}
</script>

<style lang="scss" scoped>
</style>