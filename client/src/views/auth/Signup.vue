<template>
	<div>
        <Navbar />
        <div class="container">
            <div class="card signup-form">
                <div class="card-content">
                    <h2 class="title has-text-centered">Signup</h2>
                    <b-field label="Username">
                        <b-input v-model="username" />
                    </b-field>
                    <b-field label="Password">
                        <b-input v-model="password" type="password" />
                    </b-field>
                    <b-field label="Confirm Password">
                        <b-input v-model="password_confirmation" type="password" />
                    </b-field>
                    <b-field>
                        <div class="level">
                            <div class="level-left">
                                <b-button class="level-item" type="is-primary">Signup</b-button>
                                <span class="level-item">or</span>
                                <router-link :to="{ name: 'Login' }" class="level-item">Login</router-link>
                            </div>
                        </div>
                    </b-field>
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
	name: 'Signup',
    data() {
        return {
            username: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        submitSignup() {
            console.log(this.username, this.password, this.password_confirmation)
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

.card.signup-form {
    margin: 1rem auto 0 auto;

    @include desktop {
        width: 30rem;
    } 
}

</style>