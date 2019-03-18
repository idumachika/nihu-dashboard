<template>
    <Layout>
        <div slot="head">
            <modal name="query-payment" :height="390">
                <div class="modal-header">
                    Payment details for {{queryData.reference}}
                </div>
                <div class="modaly">
                    <p>Customer name: {{queryData.customer_name}}</p>
                    <p>Customer email: {{queryData.customer_email}}</p>
                    <p>Amount: {{queryData.amount}}</p>
                    <p>Payment type: {{queryData.payment_type}}</p>
                    <p>Gateway response: {{queryData.gateway_response}}</p>
                    <p v-if="queryData.card">Card Type: {{queryData.card.type}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeQueryPayment" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
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
                                <Datatable :columns="columns" :data="paymentsData" @confirmPayment="confirmPayment"
                                           @queryPayment="queryPayment"
                                           :loading="loading" :actions="actions">
                                </Datatable>
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
    import {paymentService} from "../../services/payments.service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'confirmPayment',
            args: ['Reference'],
            text: 'Confirm',
            title: "Confirm this transaction as successful",
            showKey: 'StatusInt',
            showWhen: [0, 1]
        },
        {
            class: 'btn btn-info',
            callback: 'queryPayment',
            args: ['Reference'],
            text: 'Query',
        }
    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ['Reference', 'Amount', 'User', 'Subscription Plan', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                paymentsData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                queryData: {},
                confirmData:[]
            }
        },
        async created() {
            await paymentService.listpayment().then((response) => {
                response.forEach(({reference: ref, amount_paid: amount, paid_by: user, paid_for: sub, status_readable: status, status: statusInt}) => {
                    this.paymentsData.push({
                        Reference: ref,
                        Amount: "&#8358;" + amount,
                        User: user,
                        'Subscription Plan': sub,
                        Status: status,
                        StatusInt: statusInt
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        methods: {
            confirmPayment(ref) {
                this.loadingText = "Comfirming payment...";
                this.isLoading = true;
                paymentService.comfirmPayment(ref).then((response)=>{
                    this.isLoading = false;
                    this.confirmData = response;

                }).catch((err) => this.$toastr.error(err.message || "Payment comfirmation failed", "Error!", {timeOut: 5000}));
                window.console.log("Ref: " + ref);
            },
            deletePay() {
                window.alert('deleted');
            },
            closeQueryPayment() {
                this.$modal.hide('query-payment');
            },
            queryPayment(reference) {
                this.loadingText = "Querying payment...";
                this.isLoading = true;

                paymentService.querypayment(reference).then((response) => {
                    this.isLoading = false;
                    this.queryData = response;
                    this.$modal.show('query-payment');
                }).catch((err) => this.$toastr.error(err.message || "Payment querying failed", "Error!", {timeOut: 5000}));

            }
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>