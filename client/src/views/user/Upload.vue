<template>
    <div>
        <Navbar />
        <div class="container">
            <h1 class="title">Upload</h1>
            <UploadForm />
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UploadForm from '@/components/upload/UploadForm'

export default {
    name: 'Upload',
    components: {
        Navbar,
        Footer,
        UploadForm
    }
}
</script>

<style lang="scss" scoped>
</style>