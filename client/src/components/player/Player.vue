<template>
	<div class="player">
		<div class="container">
			<div class="player-controls">
				<b-icon class="player-backwards" icon="undo"></b-icon>
				<b-icon class="player-play" :icon="player.track.playing ? 'pause' : 'play'"></b-icon>
				<b-icon class="player-forwards" icon="redo"></b-icon>
			</div>
			<div class="player-seek">
				<span class="player-current">{{ formatTime(player.track.current) }}</span>
				<b-slider
					class="seek-bar"
					type="is-primary is-small"
					v-model="player.seek"
					@change="handleSeek"
					@dragstart="handleDragStart"
					@dragend="handleDragEnd"
					:max="1000"
					:tooltip="false"
					rounded
				>
				</b-slider>
				<span class="player-duration">{{ formatTime(player.track.data ? player.track.data.duration : '') }}</span>
			</div>
			<div class="volume-controls">
				<b-icon class="volume-icon" icon="volume-down"></b-icon>
				<b-slider
					class="volume-bar"
					type="is-primary is-small"
					v-model="player.volume"
					@input="handleVolume"
					:tooltip="false"
					rounded
				>
				</b-slider>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Player',
	computed: mapState([
		'player'
	]),
	data() {
		return {
			audio: null
		}
	},
	watch: {
		'player.playing': function() {
			this.audio = new Audio(this.player.track.data.trackUrl)

			this.audio.ontimeupdate = () => {
				this.$store.dispatch('updateCurrent', this.audio.currentTime)
				this.$store.dispatch('updateTrackCurrent', {
					id: this.player.track.data.id,
					current: this.audio.currentTime
				})
			}
		},
		'player.track.playing': function(playing) {
			if(this.audio) {
				if(playing) {
					this.audio.play()
				} else {
					this.audio.pause()
				}
			}
		}
	},
	methods: {
		toggleTrack() {
			if(this.playing) {
				this.pauseTrack()
			} else {
				this.playTrack()
			}
		},
		playTrack() {
			this.$store.dispatch('playTrack', this.player.playing)
		},
		pauseTrack() {
			this.$store.dispatch('pauseTrack', this.player.playing)
		},
		stopTrack() {
			this.pauseTrack()
			this.audio.currentTime()
		},
		formatTime(seconds) {
			return this.$moment.utc(seconds * 1000).format('m:ss')
		},
		handleSeek(value) {
			const current = (value / 1000) * this.player.track.data.duration


			this.$store.dispatch('updateCurrent', current)
		},
		handleDragStart() {
			this.$store.dispatch('updateSeekDragging', true)
		},
		handleDragEnd() {
			this.$store.dispatch('updateSeekDragging', false)
		},
		handleVolume(value) {
			if(this.audio) {
				this.audio.volume = value
			}
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

			.player-backwards, .player-forwards {
				font-size: .8rem;
			}

			.player-play {
				font-size: 1.2rem;
				margin: 0 .3rem;
			}
		}

		.player-seek {
			flex-grow: 1;
			margin: 0 1rem;
			display: flex;
			align-items: center;

			.player-current, .player-duration {
				width: 4rem;
				text-align: center;
			}

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