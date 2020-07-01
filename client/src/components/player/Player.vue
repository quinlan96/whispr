<template>
	<div>
		<audio ref="audio" :src="track.trackUrl" />
		<Waveform />
	</div>
</template>

<script>
import Waveform from './Waveform.vue'

export default {
	name: 'Player',
	props: [
		'track'
	],
	components: {
		Waveform
	}
}
</script>

<style lang="scss" scoped>
</style>