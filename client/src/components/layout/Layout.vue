<template>
	<div class="layout">
		<Navbar />
        <div v-if="alerts.length" class="container">
            <Alerts :alerts="alerts.alerts" />
        </div>
        <slot></slot>
		<Footer />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
	name: 'Layout',
    computed: {
        ...mapGetters(['alerts'])
    },
    created() {
    },
	components: {
		Navbar,
		Footer
	}
}
</script>
