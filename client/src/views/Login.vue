<template>
	<div class="home">
		<Navbar />
		<div class="container">
			<div class="card">
				<div class="card-content">
					<h1>Login</h1>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'Login',
	components: {
		Navbar,
		Footer
	}
}
</script>
