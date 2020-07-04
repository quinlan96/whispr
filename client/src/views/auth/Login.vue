<template>
	<Layout>
        <div class="container">
            <div class="card login-form">
                <div class="card-content">
                    <h2 class="title has-text-centered">Login</h2>
                    <form @submit="handleLogin">
                        <b-field label="Username">
                            <b-input v-model="form.username" required />
                        </b-field>
                        <b-field label="Password">
                            <b-input v-model="form.password" type="password" required />
                        </b-field>
                        <b-field>
                            <b-checkbox v-model="form.rememberMe" class="is-unselectable">Remember me</b-checkbox>
                        </b-field>
                        <b-notification :active="error !== ''" type="is-danger" @close="closeError">
                            {{ error }}
                        </b-notification>
                        <b-field>
                            <div class="level">
                                <div class="level-left">
                                    <b-button native-type="submit" class="level-item" type="is-primary">Login</b-button>
                                    <span class="level-item">or</span>
                                    <router-link :to="{ name: 'Signup' }" class="level-item">Signup</router-link>
                                </div>
                            </div>
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
	</Layout>
</template>

<script>
import { mapGetters } from 'vuex';

import Layout from '@/components/layout/Layout.vue'

export default {
	name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: '',
                rememberMe: false
            },
            error: ''
        }
    },
    computed: {
        ...mapGetters(['loggedIn'])
    },
    methods: {
        async handleLogin(e) {
            e.preventDefault()

            this.error = ''

            try {
                await this.$store.dispatch('login', this.form)

                this.$router.push({ name: 'Home' })
            } catch (e) {
                this.error = e.message
            }
        },
        closeError() {
            this.error = ''
        }
    },
    created() {
        if(this.loggedIn) {
            this.$router.push({ name: 'Home' })
        }
    },
	components: {
		Layout
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

.notification {
    margin-bottom: 1rem;
    padding: .5rem 1rem;
}

</style>