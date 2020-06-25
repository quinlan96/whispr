<template>
	<div>
        <Navbar />
        <div class="container">
            <div class="card login-form">
                <div class="card-content">
                    <h2 class="title has-text-centered">Login</h2>
                    <form @submit="submitLogin">
                        <b-field label="Username">
                            <b-input v-model="username" required />
                        </b-field>
                        <b-field label="Password">
                            <b-input v-model="password" type="password" required />
                        </b-field>
                        <b-field>
                            <b-checkbox v-model="rememberMe" class="is-unselectable">Remember me</b-checkbox>
                        </b-field>
                        <b-notification :active="error !== ''" type="is-danger" @close="closeError">
                            {{ error }}
                        </b-notification>
                        <b-field>
                            <div class="level">
                                <div class="level-left">
                                    <b-button native-type="submit" class="level-item" type="is-primary">Login</b-button>
                                    <span class="level-item">or</span>
                                    <router-link to="/signup" class="level-item">Signup</router-link>
                                </div>
                            </div>
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

import { login } from '@/services/auth'

export default {
	name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
            error: ''
        }
    },
    methods: {
        async submitLogin(e) {
            e.preventDefault()

            this.error = ''

            try {
                await login(this.username, this.password, this.rememberMe)
                this.$router.push('/')
            } catch (e) {
                this.error = e.message
            }
        },
        closeError() {
            this.error = ''
        }
    },
	components: {
		Navbar,
		Footer
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