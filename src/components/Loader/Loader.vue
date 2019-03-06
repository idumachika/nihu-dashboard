<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :on-cancel="onCancel"
                 :background-color="bgColor"
                 v-bind:height=height
                 v-bind:width=width
                 color="#ef483e"
                 v-bind:class="{ showLoader: !showFull}"
                 :is-full-page="showFull"></loading>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Loader',
        props: ['showFull'],
        computed: {
            bgColor() {
                return (this.showFull) ? '#d7d7d7' : ''
            }
        },
        data() {
            return {
                isLoading: true,
                width: 65,
                height: 65,
                fullPage: false
            }
        },
        components: {
            Loading
        },
        methods: {
            onCancel() {
                // console.log('User cancelled the loader.')
            }
        }
    }
</script>

<style scoped>
    .showLoader {
        position: relative;
    }
</style>