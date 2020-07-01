<template>
    <form @submit="handleUpload">
        <b-field label="Title">
            <b-input v-model="form.title"></b-input>
        </b-field>
        <b-field label="Description">
            <b-input v-model="form.description" type="textarea"></b-input>
        </b-field>
        <b-field>
            <b-checkbox v-model="form.isPrivate" class="is-unselectable label">
                Private
            </b-checkbox>
        </b-field>
        <b-field label="Track">
            <Dropzone ref="track-upload" :url="uploadUrl" @update-file="updateFile" /> 
        </b-field>
        <b-field>
            <b-button class="is-primary" native-type="submit">Submit</b-button>
        </b-field>
    </form>
</template>

<script>
import { post } from '@/services/api'
import { API_BASE } from '@/constants'

import Dropzone from './Dropzone'

export default {
    name: 'Upload',
    data() {
        return {
            form: {
                title: '',
                description: '',
                isPrivate: false,
            },
            file: null,
            track: null,
        }
    },
    computed: {
        uploadUrl() {
            const id = this.track ? this.track.id : -1

            return `${API_BASE}/tracks/${id}/upload-track`
        }
    },
    methods: {
        updateFile(file) {
            this.file = file
        },
        async handleUpload(e) {
            e.preventDefault()

            this.track = await post('/tracks', this.form)

            setTimeout(() => {
                this.$refs['track-upload'].$refs.dropzone.processQueue()
            }, 500)
        }
    },
    components: {
        Dropzone
    }
}
</script>

<style lang="scss" scoped>
</style>