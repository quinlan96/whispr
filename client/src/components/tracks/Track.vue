<template>
	<div class="track box">
		<div class="media">
			<div class="track-controls media-left has-text-centered">
				<div class="track-icons">
					<span class="track-play" @click="toggleTrack">
						<b-icon class="track-play-icon" :icon="track.playing ? 'pause-circle' : 'play-circle'" size="is-large"></b-icon>
					</span>
					<span class="track-stop" @click="stopTrack">
						<b-icon class="track-stop-icon" icon="stop-circle" size="is-medium"></b-icon>
					</span>
				</div>
				<span class="track-timecode">{{ formatTime(track.current) }}/{{ formatTime(track.data.duration) }}</span>
			</div>
			<div class="media-content track-content">
				<div class="content">
					<div class="track-info">
						<div class="track-more-info">
							<span class="track-title"><strong>{{ track.data.title }}</strong></span>
							<span class="track-user">{{ track.data.username }}</span>
						</div>
						<div class="track-created">{{ getCreatedAt() }}</div>
					</div>
					<audio ref="audio" :src="track.trackUrl" />
					<Waveform
                        :data="track.data.waveform"
						:progress="track.current / track.data.duration"
						@set-progress="setProgress"
                        @play-track="playTrack"
                        @pause-track="pauseTrack"
					/>
				</div>
				<div class="level track-social">
					<div class="level-left">
						<div class="level-item">
							<Like :track="track" />
						</div>
						<div class="level-item">
							<b-button class="track-social-icons" type="is-light" icon-left="comment" size="is-small" outlined>Comment</b-button>
						</div>
						<div class="level-item">
							<b-button class="track-social-icons" type="is-light" icon-left="share" size="is-small" outlined>Share</b-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import Waveform from '@/components/tracks/Waveform.vue'
import Like from '@/components/tracks/actions/Like.vue'

export default {
	name: 'Track',
	props: [
		'track'
	],
	computed: mapState([
		'player'
	]),
	methods: {
		toggleTrack() {
			if(this.player.playing !== this.track.data.id) {
				this.loadPlayer()
			}

			if(this.track.playing) {
                this.pauseTrack()
			} else {
                this.playTrack()
			}
		},
		loadPlayer() {
			this.$store.dispatch('loadPlayer', this.track)
		},
        playTrack() {
			this.$store.dispatch('playPlayer', this.track.data.id)
        },
        pauseTrack() {
			this.$store.dispatch('pausePlayer', this.track.data.id)
        },
		stopTrack() {
			this.$store.dispatch('stopPlayer', this.track.data.id)
		},
		formatTime(seconds) {
			if(seconds >= 0) {
				return this.$moment.utc(seconds * 1000).format('m:ss')
			}
		},
		setProgress(progress) {
			this.$store.dispatch('setTrackProgress', progress)
		},
		getCreatedAt() {
			return this.$moment(this.track.data.createdAt).fromNow()
		}
	},
	components: {
		Waveform,
        Like
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.track.box {
	padding: 1rem;
	line-height: 1.1;

	.media {
		align-items: stretch;
	}

	.track-info {
		display: flex;
		height: 100%;
		margin-bottom: .5rem;

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
	}
}

.track-controls {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 5rem;

	.track-icons {
		flex-grow: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	
		.track-play {
			.track-play-icon {
				cursor: pointer;
				width: 3.5rem;
				height: 3.5rem;
				font-size: 3.5rem;
			}
		}

		.track-stop {
			.track-stop-icon {
				cursor: pointer;
			}
		}
	}

    .track-timecode {
        display: block;
        font-size: .94rem;
		padding: .3rem 0;
    }
}
</style>