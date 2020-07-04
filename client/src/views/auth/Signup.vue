<template>
	<Layout>
        <div class="container">
            <div class="card signup-form">
                <div class="card-content">
                    <h2 class="title has-text-centered">Signup</h2>
                    <form @submit="handleSignup">
                        <b-field label="Email">
                            <b-input v-model="form.email.value" type="email" />
                        </b-field>
                        <b-field label="Username">
                            <b-input v-model="form.username.value" />
                        </b-field>
                        <b-field label="Password">
                            <b-input v-model="form.password.value" type="password" />
                        </b-field>
                        <b-field
                            label="Confirm Password"
                            :message="form.passwordConfirmation.message"
                            :type="form.passwordConfirmation.error ? 'is-danger' : ''"
                        >
                            <b-input v-model="form.passwordConfirmation.value" @blur="passwordMatch()" type="password" />
                        </b-field>
                        <b-notification :active="error !== ''" type="is-danger" @close="closeError">
                            {{ error }}
                        </b-notification>
                        <b-field>
                            <div class="level">
                                <div class="level-left">
                                    <b-button class="level-item" type="is-primary" native-type="submit">Signup</b-button>
                                    <span class="level-item">or</span>
                                    <router-link :to="{ name: 'Login' }" class="level-item">Login</router-link>
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
import Layout from '@/components/layout/Layout.vue'

export default {
	name: 'Signup',
    data() {
        return {
			form: {
				email: {
                    value: '',
                    message: '',
                    error: false
                },
				username: {
                    value: '',
                    message: '',
                    error: false
                },
				password: {
                    value: '',
                    message: '',
                    error: false
                },
				passwordConfirmation: {
                    value: '',
                    message: '',
                    error: false
                }
			},
            error: ''
        }
    },
    methods: {
        async handleSignup(e) {
            e.preventDefault()

            if(!this.passwordMatch()) {
                return
            }

			try {
                const data = Object.keys(this.form).reduce((o, key) => ({ ...o, [key]: this.form[key].value }), {})

				await this.$store.dispatch('signup', data)

                await this.$store.dispatch('addAlert', {
                    type: 'success',
                    message: 'User created successfully'
                })

				this.$router.push({ name: 'Home' })
			} catch(e) {
                this.error = e.message
			}
        },
        passwordMatch() {
            const match = this.form.password.value === this.form.passwordConfirmation.value

            this.form.passwordConfirmation.error = !match

            if(!match) {
                this.form.passwordConfirmation.message = 'Passwords do not match'
            } else {
                this.form.passwordConfirmation.message = ''
            }

            return match
        },
        closeError() {
            this.error = ''
        }
    },
    async created() {
        await this.$store.dispatch('addAlert', {
            type: 'success',
            message: 'User created successfully'
        })

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

.card.signup-form {
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