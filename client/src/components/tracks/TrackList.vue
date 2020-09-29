<template>
    <div>
        <div class="track-list">
            <Track
                v-for="track in tracks"
                :key="track.id"
                :track="track"
            />
            <b-loading :active="loading" :is-full-page="false" :can-cancel="false"></b-loading>
        </div>
        <div v-if="!tracks.length && !loading" class="has-text-centered">
            <span>No tracks found</span>
        </div>
    </div>
</template>

<script>
import Track from './Track.vue'

export default {
	name: 'Navbar',
	props: [
        'tracks',
        'loading'
    ],
	components: {
		Track
	}
}
</script>

<style scoped lang="scss">
.track-list {
    position: relative;
    height: 5rem;

    .loading-overlay .loading-background {
        background: transparent !important;
    }
}
</style>
