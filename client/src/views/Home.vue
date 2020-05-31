<template>
  <div class="home">
	<Navbar />
	<div class="container">
        <TrackList />
    </div>
	<Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import TrackList from '@/components/tracks/TrackList.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
	Footer,
    TrackList
  }
}
</script>
