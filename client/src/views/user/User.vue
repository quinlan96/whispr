<template>
	<Layout>
		<div class="container">
			<UserProfile />
		</div>
	</Layout>
</template>

<script>
import Layout from '@/components/layout/Layout.vue'
import UserProfile from '@/components/user/UserProfile.vue'

export default {
	name: 'User',
    components: {
        Layout,
		UserProfile
    }
}
</script>

<style lang="scss" scoped>
</style>