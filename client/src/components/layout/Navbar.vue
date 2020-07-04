<template>
	<b-navbar>
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ name: 'Home' }">
                <img class="navbar-logo" src="../../assets/images/logo.svg" />
                <span class="navbar-title has-text-white">ThisWeeksSponsor</span>
			</b-navbar-item>
		</template>
        <template slot="start">
            <b-navbar-item v-if="loggedIn" tag="router-link" :to="{ name: 'Upload' }">
                Upload
            </b-navbar-item>
        </template>
		<template slot="end">
			<b-navbar-item v-if="!loggedIn || !user.id" tag="div" class="user-actions">
				<b-button tag="router-link" :to="{ name: 'Login' }" type="is-light" outlined>Login</b-button>
				<b-button tag="router-link" :to="{ name: 'Signup' }" type="is-primary" outlined>Signup</b-button>
			</b-navbar-item>
            <b-navbar-dropdown v-else arrowless hoverable right class="user-profile">
                <template slot="label">
                    <b-icon pack="fas" icon="user-circle" size="is-small"></b-icon>
                    <span style="margin-left: .5rem;">{{ user.username }}</span>
                </template>
                <b-navbar-item tag="router-link" :to="{ name: 'User', params: { user: user.username } }">
                    Profile
                </b-navbar-item>
                <b-navbar-item type="is-text" @click="handleLogout">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
		</template>
	</b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Navbar',
    computed: {
        ...mapGetters(['loggedIn', 'user', 'token'])
    },
    methods: {
        handleLogout(e) {
            e.preventDefault()

            this.$store.dispatch('logout')
        }
    },
    async created() {
        if(this.loggedIn && this.token && !this.user.id) {
            try {
                await this.$store.dispatch('verifyToken')
            } catch(e) {
                await this.$store.dispatch('logout')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/_variables";

.navbar-logo {
    display: block;
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
