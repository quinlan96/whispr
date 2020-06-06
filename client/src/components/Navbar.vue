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
				<b-button type="is-light" outlined>Sign In</b-button>
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
