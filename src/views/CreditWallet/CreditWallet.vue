<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                        Credit Wallet
                    </h3>
                </div>
            </div>
        <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-5 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello Admin! Credit wallet</h4>
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="iduma chika"  v-model="user" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="$50000" v-model="amount_paid"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Write here ...." v-model="description"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="40000" v-model="unit_worth"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Top Up Wallet
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
        
    </Layout>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {WalletService} from "../../services/wallet.service";


    

    export default {
        name: 'credit',
        components: {Loader, Layout},
        data: function () {
            return {    user: '', amount_paid: '', description: '', unit_worth: '',loading: false}
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            async post() {
                this.loading = true;
                await WalletService.creditWallet({
                    user: this.user,
                    amount_paid: this.amount_paid,
                    description: this.description,
                    unit_worth: this.unit_worth,

                }).then(function (response) {
                    this.$toastr.response(response.message, "Wallet Topup Succesfull!", {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "Wallet Topup failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>