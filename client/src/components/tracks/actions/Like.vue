<template>
    <b-button
        class="track-social-icons"
        type="is-light"
        icon-left="heart"
        size="is-small"
        outlined
    >
        {{ track.likes ? track.likes : 'Like' }}
    </b-button>
</template>

<script>
export default {
	name: 'Like',
	props: [
		'track'
	],
	methods: {
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
</style>