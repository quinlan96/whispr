<template>
    <Layout>
		<div class="container">
			<TrackList :tracks="tracks" />
		</div>
    </Layout>
</template>

<script>
import Layout from '@/components/layout/Layout.vue'
import TrackList from '@/components/tracks/TrackList.vue'
import { get } from '@/services/api'

export default {
	name: 'Home',
	data() {
		return {
			tracks: []
		}
	},
	async mounted() {
		this.tracks = await get('/tracks')
	},
	components: {
        Layout,
		TrackList
	}
}
</script>
