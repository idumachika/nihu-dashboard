<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :on-cancel="onCancel"
                 background-color='#d7d7d7'
                 v-bind:height=height
                 v-bind:width=width
                 color="#ef483e"
                 :is-full-page="fullPage"></loading>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Loader',
        data() {
            return {
                isLoading: true,
                width: 65,
                height: 65,
                fullPage: true
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