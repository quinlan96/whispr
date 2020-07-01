<template>
	<div class="track box">
		<div class="media">
			<div class="player-controls media-left has-text-centered">
				<span class="player-play" @click="toggleTrack">
                    <b-icon :icon="playing ? 'pause-circle' : 'play-circle'" size="is-large" class="player-play-icon"></b-icon>
				</span>
				<span class="player-timecode">{{ formatTime(currentTime) }}/{{ formatTime(duration) }}</span>
			</div>
			<div class="media-content">
				<div class="content">
					<div class="track-info">
						<div class="track-more-info">
							<span class="track-title"><strong>{{ track.title }}</strong></span>
							<span class="track-user">{{ track.user }}</span>
						</div>
						<div class="track-posted">{{ track.posted | moment('from', 'now') }}</div>
					</div>
					<audio ref="audio" :src="track.trackUrl" />
					<Waveform
                        :data="track.waveform"
						:progress="currentTime / duration"
						@set-progress="setProgress"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Waveform from '../player/Waveform.vue'

export default {
	name: 'Track',
	props: [
		'track',
		'currentTrack'
	],
	data() {
		return {
			playing: false,
			duration: 0,
			currentTime: 0
		}
	},
	watch: {
		currentTrack: function(newVal) {
			if(this.track.id != newVal) {
				this.playing = false
				this.$refs.audio.pause()
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
            this.playing = true
            this.$refs.audio.play()
            this.$emit('on-play-track', this.track.id)
        },
        pauseTrack() {
            this.playing = false
            this.$refs.audio.pause()
            this.$emit('on-play-track', null)
        },
		formatTime(seconds) {
			return this.$moment.utc(seconds * 1000).format('m:ss')
		},
		setProgress(progress) {
			this.$refs.audio.currentTime = (this.duration * progress)
		}
	},
	mounted() {
		this.$refs.audio.onloadedmetadata = () => {
			this.duration = this.$refs.audio.duration
		}
		
		this.$refs.audio.ontimeupdate = () => {
			this.currentTime = this.$refs.audio.currentTime
		}

		this.$refs.audio.onended = () => {
			this.playing = false
		}
	},
	components: {
		Waveform
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.track.box {
	padding: 1rem;
	line-height: 1.1;

	.track-info {
		display: flex;

		.track-more-info {
			flex-grow: 1;

			.track-title {
				display: block;
			}
			
			.track-user {
				color: $grey-light;
				display: block;
				font-size: .8rem;
			}
		}

		.track-posted {

		}
	}
}

.player-controls {
	padding: .5rem 0;
    width: 100px;

    .player-play {
        display: block;

        .player-play-icon {
            cursor: pointer;
        }
    }

    .player-timecode {
        display: block;
        font-size: .94rem;
        margin-top: .75rem;
    }
}



</style>