<template>
    <div class="container-scroller">
        <Loader v-if="loading"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth">
                <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                                <img src="../../assets/jive.svg">
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">Sign in to continue.</h6>
                            <form class="pt-3" @submit.prevent="login">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Username" v-model="username" required>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Password" v-model="password"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">SIGN IN
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import {mapActions} from 'vuex';
    import router from '../../router'

    export default {
        name: 'Login',
        components: {Loader},
        data: function () {
            return {username: '', password: '', loading: false}
        },
        methods: {
            ...mapActions({loginUser: 'LOGIN'}),
            async login() {
                this.loading = true;
                await this.loginUser({
                    username: this.username,
                    password: this.password
                }).then(function () {
                    router.push({name: 'dashboard'});
                }).catch((error) => {
                    this.$toastr.error(error.message, "Login Failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
        }
    }
</script>