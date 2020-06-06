<template>
	<div class="home">
		<Navbar />
		<div class="container">
			<TrackList :tracks="tracks" />
		</div>
		<Footer />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
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
		Navbar,
		Footer,
		TrackList
	}
}
</script>
