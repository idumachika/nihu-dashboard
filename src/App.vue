<template>
    <div id="app">
        <router-view/>
        <!-- <VuInjector src="/static/js/vendor.js"/> -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import VuInjector from 'vue-inject-js';

    Vue.use(VuInjector);
    export default {
        // components: {VuInjector}
    }
</script>
<style>
    @import "assets/css/iconfonts/mdi/css/materialdesignicons.min.css";
    @import "assets/css/vendor.bundle.base.css";
    @import "assets/css/style.css";
</style>
