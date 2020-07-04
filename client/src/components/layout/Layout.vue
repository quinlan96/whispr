<template>
	<div class="layout">
		<Navbar />
        <div v-if="alerts.length" class="container">
            <Alerts :alerts="alerts" />
        </div>
        <slot></slot>
		<Footer />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import Alerts from './alerts/Alerts.vue'

export default {
	name: 'Layout',
    computed: {
        ...mapGetters(['alerts'])
    },
    created() {
    },
	components: {
		Navbar,
		Footer,
		Alerts
	}
}
</script>
