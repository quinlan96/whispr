<template>
	<div class="notifications">
        <Alert v-for="(alert, index) in alerts" :alert="alert" :index="index" :key="index" />
	</div>
</template>

<script>
import Alert from './Alert.vue'

export default {
	name: 'Alerts',
    props: ['alerts'],
    components: {
        Alert
    }
}
</script>

<style scoped lang="scss">
.notifications {
    margin: 1.5rem 0;
}
</style>
