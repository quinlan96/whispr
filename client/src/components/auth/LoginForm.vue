<template>
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'LoginForm',
    props: ['redirectTo'],
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

				await this.$store.dispatch('addAlert', {
					type: 'success',
					message: 'Logged in successfully'
				})

                if(this.redirectTo) {
                    this.$router.push(this.redirectTo)
                } else {
                    this.$router.push({ name: 'Home' })
                }

            } catch (e) {
                this.error = e.message
            }
        },
        closeError() {
            this.error = ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss";

.notification {
    margin-bottom: 1rem;
    padding: .5rem 1rem;
}

</style>