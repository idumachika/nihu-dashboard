<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                        Payments
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :fields="fields" :data="paymentsData" :perPage="1">
                                </Datatable>
                                <Loader v-if="loading" :showFull="false"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import Datatable from '../../components/Datatable/Datatable';
    import {paymentService} from "../../services/payments.service";
    import Loader from "../../components/Loader/Loader";

    export default {
        name: "Payment",
        data() {
            return {
                fields: ['Reference', 'Amount', 'User', 'Subscription Plan', 'Status'],
                loading: true,
                paymentsData: []
            }
        },
        async created() {
            await paymentService.listpayment().then((response) => {
                response.forEach(({reference: ref, amount_paid: amount, paid_by: user, paid_for: sub, status_readable: status}) => {
                    this.paymentsData.push({
                        Reference: ref,
                        Amount: "&#8358;" + amount,
                        User: user,
                        'Subscription Plan': sub,
                        Status: status
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        components: {Layout, Datatable, Loader}
    }
</script>

<style scoped>

</style>