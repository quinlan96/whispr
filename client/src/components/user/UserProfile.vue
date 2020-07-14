<template>
	<div>
		<h1 class="title">{{ $route.params.user }}</h1>
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
            user: null,
			tracks: []
		}
	},
	methods: {
        async getUser() {
            const username = this.$route.params.user

            this.user = await get('/users/get-user', {
                query: {
                    username: username
                }
            })
        },
		async getTracks() {
            this.tracks = await get(`/users/${this.user.id}/tracks`)
		}
	},
	async mounted() {
        await this.getUser()
		await this.getTracks()
	},
	components: {
		TrackList
	}
}
</script>

<style lang="scss" scoped>
</style>