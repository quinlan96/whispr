<template>
	<div id="app">
		<Layout>
			<router-view/>
		</Layout>
	</div>
</template>

<script>
import Layout from '@/components/layout/Layout.vue'

import { PROJECT_NAME } from '@/constants'

export default {
	name: 'App',
	title: PROJECT_NAME,
	components: {
		Layout
	}
}
</script>

<style lang="scss">
@import "assets/scss";

body {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
}

html, #app {
	margin: 0;
	padding: 0;
}
</style>
