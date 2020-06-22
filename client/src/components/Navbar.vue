<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item>
				<img src="../assets/images/logo.svg" />
				<span style="margin-left: .5rem">ThisWeeksSponsor</span>
			</b-navbar-item>
		</template>
		<template slot="end">
			<b-navbar-item tag="div">
				<router-link to="/login" class="is-light">Log In</router-link>
			</b-navbar-item>
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
</style>
