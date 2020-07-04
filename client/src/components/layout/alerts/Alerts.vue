<template>
	<div>
        <b-notification
            v-for="alert in alerts"
            :type="`is-${alert.type}`"
            :key="alert.message"
        >
            {{ alert.message }}
        </b-notification>
	</div>
</template>

<script>
export default {
	name: 'Alerts',
    props: ['alerts']
}
</script>

<style scoped lang="scss">
</style>
