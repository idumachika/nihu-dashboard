<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile">
                <a href="#" class="nav-link">
                    <div class="nav-profile-image">
                        <i class="mdi mdi-account-circle mdi-48px"></i>
                        <span class="login-status online"></span> <!--change to offline or busy as needed-->
                    </div>
                    <div class="nav-profile-text d-flex flex-column">
                        <span class="font-weight-bold mb-2">{{user.display_name}}</span>
                        <span class="text-secondary text-small">Admin</span>

                    </div>
                    <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </a>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'dashboard' === currentPage }">
                <router-link class="nav-link" to="dashboard">
                    <span class="menu-title">Dashboard</span>
                    <i class="mdi mdi-home menu-icon"></i>
                </router-link>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'payments' === currentPage }">
                <router-link class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false"
                             aria-controls="ui-basic" to="payments">
                    <span class="menu-title">Payments</span>
                    <i class="mdi mdi mdi-cash-multiple menu-icon"></i>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "LeftNav",
        computed: {
            ...mapGetters({user: "GET_USER"}),
            currentPage() {
                return this.$route.name;
            }
        }
    }
</script>

<style scoped>

</style>