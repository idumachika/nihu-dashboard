<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Add Admin
                    </h3>
                </div>
            </div>
            <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-6 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello Super Admin! Add admin </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Username"  v-model="username" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="idumachika@gmail.com" v-model="email"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="password" v-model="password"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="steve" v-model="display_name"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Add Admin
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
        </div>
        
    </Layout>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {AddAdminService} from "../../services/AddAdmin.Service";


    

    export default {
        name: 'admin',
        components: {Loader, Layout},
        data: function () {
            return {    username: '', email: '', password: '', display_name: '',loading: false}
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            async post() {
                this.loading = true;
                await AddAdminService.addadmin({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    display_name: this.display_name,

                }).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "Account Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>