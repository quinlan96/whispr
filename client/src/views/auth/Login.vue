<template>
	<Layout>
        <div class="container">
            <div class="card login-form">
                <div class="card-content">
                    <h2 class="title has-text-centered">Login</h2>
                    <LoginForm :redirectTo="this.$route.query.redirectTo"/>
                </div>
            </div>
        </div>
	</Layout>
</template>

<script>
import Layout from '@/components/layout/Layout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
	name: 'Login',
    async created() {
        if(this.loggedIn) {
            this.$router.push({ name: 'Home' })
        }
    },
	components: {
		Layout,
        LoginForm
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss";

.card.login-form {
    margin: 1rem auto 0 auto;

    @include desktop {
        width: 30rem;
    } 
}
</style>