<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item>ThisWeeksSponsor</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
			<b-navbar-item tag="router-link" to="/upload">Upload</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
export default {
	name: 'Navbar'
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables";

.navbar {
	
	.navbar-item {
	}
}
</style>
