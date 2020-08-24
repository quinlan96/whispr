<template>
    <div class="container">
        <div class="card signup-form">
            <div class="card-content">
                <h2 class="title has-text-centered">Signup</h2>
                <SignupForm />
            </div>
        </div>
    </div>
</template>

<script>
import SignupForm from '@/components/auth/SignupForm.vue'

export default {
	name: 'Signup',
	components: {
        SignupForm
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