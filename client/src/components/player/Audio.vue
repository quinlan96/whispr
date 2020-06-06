<template>
	<audio ref="player">
		<source src="https://media.soundgasm.net/sounds/d799feaee5839b76f1d90058cf04c789d59fb0b6.m4a" type="audio/mp4" />
	</audio>
</template>

<script>
export default {
	name: 'Audio',
	methods: {
	},
	mounted() {
		this.$refs.player.play()
	}
}
</script>

<style lang="scss" scoped>
</style>