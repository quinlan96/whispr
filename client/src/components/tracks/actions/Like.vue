<template>
    <b-button
        class="track-social-icons"
        type="is-light"
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
                console.log(await post(`/tracks/${this.track.id}/like`))
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
</style>