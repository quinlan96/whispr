<template>
	<div class="player">
		<div class="container">
			<div class="player-controls">
				<b-icon icon="step-backward"></b-icon>
				<b-icon icon="play"></b-icon>
				<b-icon icon="step-forward"></b-icon>
			</div>
			<div class="player-seek">
				<b-slider class="seek-bar" type="is-primary is-small" v-model="seek" max="1000" rounded></b-slider>
			</div>
			<div class="fuck">
				<b-dropdown position="is-top-left" hoverable>
					<template slot="trigger">
						<b-icon icon="volume-down"></b-icon>
					</template>
					<b-dropdown-item>
						<b-slider v-model="volume"></b-slider>
					</b-dropdown-item>
				</b-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Player',
	props: [
		'track'
	],
	data() {
		return {
			seek: 0,
			volume: 0
		}
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.player {
	background-color: $grey-accent;
	padding: .5rem 0;

	position: fixed;
	bottom: 0;
	width: 100%;

	.container {
		display: flex;
		align-items: center;

		.player-controls {
			display: flex;
		}

		.player-seek {
			flex-grow: 1;
			margin: 0 1rem;
		}
	}
}
</style>