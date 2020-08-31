<template>
	<div :class="{ 'hide': !(player.playing > 0), 'player': true }">
		<div class="container">
			<div class="player-controls">
				<span @click="stepBackwards" class="player-backwards">
					<b-icon class="player-backwards-icon" icon="undo"></b-icon>
				</span>
				<span @click="toggleTrack" class="player-play">
					<b-icon class="player-play-icon" :icon="player.track.playing ? 'pause' : 'play'"></b-icon>
				</span>
				<span @click="stepForwards" class="player-forwards">
					<b-icon class="player-forwards-icon" icon="redo"></b-icon>
				</span>
			</div>
			<div class="player-seek">
				<span class="player-current">{{ formatTime(player.track.current) }}</span>
				<b-slider
					class="seek-bar"
					type="is-primary is-small"
					v-model="player.seek"
					@change="changeSeek"
					@dragstart="seekDragStart"
					@dragend="seekDragEnd"
					:max="1000"
					:tooltip="false"
					rounded
				>
				</b-slider>
				<span class="player-duration">{{ formatTime(player.track.data ? player.track.data.duration : '') }}</span>
			</div>
			<div class="volume-controls">
				<span @click="toggleMute" class="volume-icon-container">
					<b-icon :icon="getVolumeIcon()"></b-icon>
				</span>
				<b-slider
					class="volume-bar"
					type="is-primary is-small"
					v-model="player.volume"
					@input="inputVolume"
					@change="changeVolume"
					@dragstart="volumeDragStart"
					@dragend="volumeDragEnd"
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

import { KEY_SPACEBAR, KEY_LEFT, KEY_RIGHT } from '@/constants'


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
		'player.playing': function(newPlaying, oldPlaying) {
			if(newPlaying !== oldPlaying && this.audio) {
				this.audio.pause()

				this.audio.removeEventListener('timeupdate', this.trackUpdateListener)

				Vue.set(this.audio, null)
			}

			if(newPlaying > 0) {
				this.audio = new Audio(this.player.track.data.trackUrl)
				
				this.audio.addEventListener('timeupdate', this.trackUpdateListener)

				this.audio.play()
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
		},
		'player.setVolume': function(volume) {
			if(this.audio) {
				this.audio.volume = volume
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
		toggleMute() {
			if(this.player.volume > 0) {
				this.$store.dispatch('updateVolumePrevious', this.player.volume)
				this.audio.volume = 0
				this.$store.dispatch('updateVolume', 0)
			} else {
				this.audio.volume = (this.player.volumePrevious / 100)
				this.$store.dispatch('updateVolume', this.player.volumePrevious)
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
		stepBackwards() {
			const current = this.player.track.current - 15

			this.$store.dispatch('setTrackCurrent', current)
		},
		stepForwards() {
			const current = this.player.track.current + 15

			this.$store.dispatch('setTrackCurrent', current)
		},
		stopTrack() {
			this.pauseTrack()
			this.audio.currentTime()
		},
		changeSeek(value) {
			const current = (value / 1000) * this.player.track.data.duration

			this.$store.dispatch('updateCurrent', current)
			this.$store.dispatch('setTrackProgress', value / 1000)
		},
		seekDragStart() {
			this.$store.dispatch('updateSeekDragging', true)
		},
		seekDragEnd() {
			this.$store.dispatch('updateSeekDragging', false)
		},
		changeVolume(value) {
			if(value > 0) {
				this.$store.dispatch('updateVolumePrevious', value)
			}
		},
		inputVolume(value) {
			if(this.audio) {
				this.audio.volume = (value / 100)
			}
		},
		volumeDragStart() {
			if(this.player.volume > 0) {
				this.$store.dispatch('updateVolumePrevious', this.player.volume)
			}
		},
		volumeDragEnd() {
			if(this.player.volume > 0) {
				this.$store.dispatch('updateVolumePrevious', this.player.volume)
			}
		},
		trackUpdateListener() {
			this.$store.dispatch('updateCurrent', this.audio.currentTime)
			this.$store.dispatch('updateTrackCurrent', {
				id: this.player.track.data.id,
				current: this.audio.currentTime
			})
		},
		getVolumeIcon() {
			if(this.player.volume === 0) {
				return 'volume-mute'
			} else if(this.player.volume < 33.33) {
				return 'volume-off'
			} else if(this.player.volume < 66.66) {
				return 'volume-down'
			} else {
				return 'volume-up'
			}
		},
		formatTime(seconds) {
			if(seconds >= 0) {
				return this.$moment.utc(seconds * 1000).format('m:ss')
			}
		}
	},
	created() {
		window.addEventListener('keydown', (e) => {
			if(this.audio) {
				if(e.keyCode === KEY_SPACEBAR) {
					this.toggleTrack()
				} else if(e.keyCode === KEY_LEFT) {
					this.stepBackwards()		
				} else if(e.keyCode == KEY_RIGHT) {
					this.stepForwards()
				}
			}
		})
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
			align-items: center;

			.player-play, .player-backwards, .player-forwards {
				display: flex;
				align-items: center;
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

			.volume-icon-container {
				display: flex;
				align-items: center;
				margin-right: .75rem;

				cursor: pointer;
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