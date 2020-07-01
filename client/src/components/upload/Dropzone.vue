<template>
    <div>
        <vue-dropzone
            id="dropzone"
            ref="dropzone"
            :options="dropzoneOptions"
            :useCustomSlot="true"
            :includeStyling="false"
            @vdropzone-file-added="fileAdded"
            @vdropzone-queue-complete="queueComplete"
            @vdropzone-total-upload-progress="uploadProgress"
        >
            <div class="dropzone-custom-content has-text-centered">
                <div>
                    <b-icon icon="upload" size="is-large" />
                </div>
                <span class="dropzone-custom-message subtitle"><span class="dropzone-choose-file">Choose a file</span> or drag it here</span>
            </div>

        </vue-dropzone>
        <b-icon ref="track-icon" class="track-icon" icon="file-audio" size="is-medium" />
        <b-icon ref="remove-icon" class="remove-icon" icon="times-circle" size="is-medium" />
    </div>
</template>

<script>
import VueDropzone from 'vue2-dropzone'

const previewTemplate = `\
<div class="dz-preview dz-file-preview">
    <div class="dz-image">
    </div>
    <div class="dz-details">
        <div class="dz-track-info">
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-size" data-dz-size></div>
        </div>
        <div class="dz-error-message">
            <span class="tag is-danger" data-dz-errormessage></span>
        </div>
        <div class="dz-progress">
            <progress class="progress is-primary" value="0" max="100">0%</progress>
            <span class="dz-upload" data-dz-uploadprogress></span>
        </div>
    </div>
    <div class="dz-remove">
    </div>
</div>\
`

export default {
    name: 'Upload',
    props: ['url'],
    watch: {
        url: function(url) {
            this.$refs.dropzone.setOption('url', url)
        }
    },
    data() {
        return {
            dropzoneOptions: {
                url: this.url,
                maxFiles: 1,
                maxFilesize: 1024,
                uploadMultiple: false,
                autoProcessQueue: false,
                createImageThumbnails: false,
                acceptedFiles: 'audio/*',
                previewTemplate: previewTemplate
            }
        }
    },
    methods: {
        fileAdded() {
            const dropzone = this.$refs.dropzone
            const files = dropzone.dropzone.files

            if(files.length > 1) {
                dropzone.removeFile(files[0])
            }

            this.$emit('update-file', dropzone.dropzone.files[0])

            const previewImages = dropzone.$refs.dropzoneElement.querySelectorAll('.dz-preview .dz-image')
            const removeButtons = dropzone.$refs.dropzoneElement.querySelectorAll('.dz-preview .dz-remove')

            previewImages.forEach((el) => {
                el.innerHTML = this.$refs['track-icon'].$el.innerHTML
            })

            removeButtons.forEach((el) => {
                el.innerHTML = this.$refs['remove-icon'].$el.innerHTML
                el.addEventListener('click', (e) => {
                    e.preventDefault()

                    this.$refs.dropzone.removeAllFiles()
                })
            })
        },
        queueComplete(response) {
            console.log("BIIIIITCH" + response)
        },
        uploadProgress(progress) {
            const progressElement = this.$refs.dropzone.$refs.dropzoneElement.querySelectorAll('.dz-preview progress')

            progressElement.forEach((el) => {
                el.setAttribute('value', Math.round(progress))
                el.innerHTML = Math.round(progress) + '%'
            })
        }
    },
    components: {
        VueDropzone
    }
}
</script>

<style lang="scss" scoped>
.dz-preview {
    .track-icon, .remove-icon {
        display: block;
    }
}

.track-icon, .remove-icon {
    display: none;
}
</style>