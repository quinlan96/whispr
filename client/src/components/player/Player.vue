<template>
	<div class="player">
		<div class="container">
			<div class="player-controls">
				<b-icon icon="undo"></b-icon>
				<b-icon icon="play"></b-icon>
				<b-icon icon="redo"></b-icon>
			</div>
			<div class="player-seek">
				<span>-:--</span>
				<b-slider class="seek-bar" type="is-primary is-small" v-model="seek" :max="1000" :tooltip="false" rounded></b-slider>
				<span>-:--</span>
			</div>
			<div class="volume-controls">
				<b-icon class="volume-icon" icon="volume-down"></b-icon>
				<b-slider class="volume-bar" type="is-primary is-small" v-model="volume" :tooltip="false" rounded></b-slider>
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
			display: flex;
			align-items: center;

			.seek-bar {
				margin: 0 1rem;
			}
		}

		.volume-controls {
			display: flex;
			align-items: center;

			.volume-icon {
				margin-right: .5rem;
			}

			.volume-bar {
				width: 5rem;
			}
		}
	}
}
</style>