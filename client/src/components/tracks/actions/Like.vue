<template>
    <b-button
        :type="track.liked ? 'is-primary' : 'is-light'"
        icon-left="heart"
        size="is-small"
        outlined
        @click="handleLike"
    >
        {{ track.likes ? track.likes : 'Like' }}
    </b-button>
</template>

<script>
import { post } from '@/services/api'

export default {
    name: 'Like',
    props: [
        'track'
    ],
	methods: {
        async handleLike() {
            try {
				const url = `/tracks/${this.track.id}/` + (this.track.liked ? 'unlike' : 'like')

                const track = await post(url)

				console.log(track)

				this.$store.dispatch('updateTrack', track)
            } catch (e) {
                console.log(e.message)
            }
        }
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.liked {
	border-color: $primary;
}
</style>