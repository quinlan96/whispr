<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item>
				<router-link to="/" class="navbar-logo">
                    <img src="../assets/images/logo.svg" />
                </router-link>
                <router-link to="/" class="navbar-title has-text-white">ThisWeeksSponsor</router-link>
			</b-navbar-item>
		</template>
		<template slot="end">
			<b-navbar-item v-if="!user" tag="div" class="user-actions">
				<b-button tag="router-link" to="/login" type="is-light" outlined>Login</b-button>
				<b-button tag="router-link" to="/signup" type="is-primary" outlined>Signup</b-button>
			</b-navbar-item>
            <b-navbar-item v-else tag="div" class="user-profile">
                <b-icon icon="account_circle" size="is-small"></b-icon> {{ user.username }}
            </b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
import { tokenExists } from '@/services/auth'

export default {
	name: 'Navbar',
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    async mounted() {
        if(tokenExists() && !this.user) {
            await this.$store.dispatch('fetchUser')
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables";

.navbar-logo {
    img {
        display: block;
    }
}

.navbar-title {
    margin-left: .5rem;
}

.user-actions {
    .button {
        margin: 0 .3rem;

        &:first-child { margin-left: 0; }
        &:last-child { margin-right: 0; }
    }
}
</style>
