<template>
	<div :class="{ 'hide': !(player.playing > 0), 'player': true }">
		<div class="container">
			<div class="player-controls">
				<span @click="stepBackwards">
					<b-icon class="player-backwards" icon="undo"></b-icon>
				</span>
				<span @click="toggleTrack">
					<b-icon class="player-play" :icon="player.track.playing ? 'pause' : 'play'"></b-icon>
				</span>
				<span @click="stepForwards">
					<b-icon class="player-forwards" icon="redo"></b-icon>
				</span>
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
import Vue from 'vue'
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
		'player.playing': function(playing) {
			if(playing > 0) {
				this.audio = new Audio(this.player.track.data.trackUrl)
				
				this.audio.addEventListener('timeupdate', this.trackUpdateListener)
			} else {
				this.audio.pause()

				this.audio.removeEventListener('timeupdate', this.trackUpdateListener)

				Vue.set(this.audio, null)
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
		},
		'player.track.setCurrent': function(current) {
			if(this.audio) {
				this.audio.currentTime = current
			}
		}
	},
	methods: {
		toggleTrack() {
			if(!this.audio) {
				this.loadPlayer()
			}

			if(this.player.track.playing) {
				this.pauseTrack()
			} else {
				this.playTrack()
			}
		},
		loadPlayer() {
			this.$store.dispatch('loadPlayer', this.player.track)
		},
		playTrack() {
			this.$store.dispatch('playPlayer', this.player.playing)
		},
		pauseTrack() {
			this.$store.dispatch('pausePlayer', this.player.playing)
		},
		stepForwards() {

		},
		stepBackwards() {

		},
		stopTrack() {
			this.pauseTrack()
			this.audio.currentTime()
		},
		formatTime(seconds) {
			if(seconds >= 0) {
				return this.$moment.utc(seconds * 1000).format('m:ss')
			}
		},
		handleSeek(value) {
			const current = (value / 1000) * this.player.track.data.duration


			this.$store.dispatch('updateCurrent', current)
			this.$store.dispatch('setTrackProgress', value / 1000)
		},
		handleDragStart() {
			this.$store.dispatch('updateSeekDragging', true)
		},
		handleDragEnd() {
			this.$store.dispatch('updateSeekDragging', false)
		},
		handleVolume(value) {
			if(this.audio) {
				this.audio.volume = (value / 100)
			}
		},
		trackUpdateListener() {
			this.$store.dispatch('updateCurrent', this.audio.currentTime)
			this.$store.dispatch('updateTrackCurrent', {
				id: this.player.track.data.id,
				current: this.audio.currentTime
			})
		}
	},
	components: {
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

$player-height: 3.5rem;

.player {
	background-color: $grey-accent;
	padding: .5rem 0;

	position: fixed;
	bottom: 0;

	height: $player-height;
	width: 100%;

	transition: bottom .5s ease-in-out;

	.container {
		display: flex;
		align-items: center;

		.player-controls {
			display: flex;

			.player-play, .player-backwards, .player-forwards {
				cursor: pointer;
			}

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

	&.hide {
		bottom: -$player-height;
	}
}
</style>