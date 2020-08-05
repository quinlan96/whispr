<template>
    <div>
        <div v-if="tracks.length">
            <Track
                v-for="track in tracks"
                :key="track.id"
                :track="track"
            />
        </div>
        <div v-else class="has-text-centered">
            <span>No tracks found</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Track from './Track.vue'

export default {
	name: 'Navbar',
	props: [
		'tracks'
    ],
    computed: mapState([
        'player'
    ]),
	components: {
		Track
	}
}
</script>

<style scoped lang="scss">
</style>
