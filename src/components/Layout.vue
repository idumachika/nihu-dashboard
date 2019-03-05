<template>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <HeaderNav/>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <LeftNav/>
            <!-- partial:partials/_sidebar.html -->
            <slot name="body"></slot>
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
</template>

<script>
    import LeftNav from './Navigation/LeftNav';
    import HeaderNav from './Navigation/HeaderNav';

    export default {
        name: "Layout",
        components: {LeftNav, HeaderNav}
    }
</script>

<style scoped>

</style>