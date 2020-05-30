<template>
  <div class="home">
	<Navbar />
	<b-container><h1>Hi</h1></b-container>
	<Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
	Footer
  }
}
</script>
