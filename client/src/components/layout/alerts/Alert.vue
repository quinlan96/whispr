<template>
    <b-notification
        :type="`is-${alert.type}`"
        :duration="5000"
        animation="fade"
        auto-close
        @close="handleClose"
    >
        {{ alert.message }}
    </b-notification>
</template>

<script>
export default {
	name: 'Alert',
    props: ['alert', 'index'],
    methods: {
        handleClose() {
            this.$store.dispatch('removeAlert', this.index)
        }
    }
}
</script>

<style scoped lang="scss">
</style>
