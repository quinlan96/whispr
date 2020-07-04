<template>
    <Layout>
        <div class="container">
            <h1 class="title">Upload</h1>
            <UploadForm />
        </div>
    </Layout>
</template>

<script>
import Layout from '@/components/layout/Layout'
import UploadForm from '@/components/upload/UploadForm'

export default {
    name: 'Upload',
    components: {
        Layout,
        UploadForm
    }
}
</script>

<style lang="scss" scoped>
</style>