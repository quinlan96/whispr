<template>
	<div class="layout">
		<Navbar />
		<div v-if="alerts.length" class="container">
			<Alerts :alerts="alerts" />
		</div>
		<slot></slot>
		<Footer />
		<Player />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import Alerts from './alerts/Alerts.vue'

import Player from '@/components/player/Player.vue'

export default {
	name: 'Layout',
    computed: {
        ...mapGetters(['alerts'])
    },
	components: {
		Navbar,
		Footer,
		Alerts,
		Player
	}
}
</script>
