<template>
    <b-button
        class="like-btn"
        :type="track.data.liked ? 'is-primary' : 'is-light'"
        icon-left="heart"
        size="is-small"
        outlined
        @click="handleLike"
    >
        {{ track.data.likes ? track.data.likes : 'Like' }}
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
        async handleLike(e) {
            e.target.closest('button').blur()

            try {
				const url = `/tracks/${this.track.data.id}/` + (this.track.data.liked ? 'unlike' : 'like')

                const track = await post(url)

				this.$store.dispatch('updateTrackData', track)
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

.like-btn {
	border-color: $primary;
}
</style>