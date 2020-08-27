<template>
	<div class="container">
		<UserProfile />
	</div>
</template>

<script>
import UserProfile from '@/components/user/UserProfile.vue'

export default {
	name: 'User',
    components: {
		UserProfile
    }
}
</script>

<style lang="scss" scoped>
</style>