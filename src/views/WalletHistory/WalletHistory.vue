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
        <!-- <div slot="head">
            <modal name="comfirm-payment" :height="390">
                <div class="modal-header">
                    Payment details for {{confirmData.reference}}
                </div>
                <div class="modaly">
                    <p>Customer name: {{confirmData.customer_name}}</p>
                    <p>Customer email: {{confirmData.customer_email}}</p>
                    <p>Amount: {{queryData.amount}}</p>
                    <p>Payment type: {{queryData.payment_type}}</p>
                    <p>Gateway response: {{queryData.gateway_response}}</p>
                    <p v-if="queryData.card">Card Type: {{queryData.card.type}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeQueryPayment" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div> -->
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
    import {WalletHistoryService} from "../../services/Wallethistory.Service";
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
        // {
        //     class: 'btn btn-info',
        //     callback: 'queryPayment',
        //     args: ['Reference'],
        //     text: 'Query',
        // }
    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ['Reference', 'Unit Worth', 'Amount Paid' ,'Description', 'User', 'Type' ,'Created'],
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
                confirmData:{}
            }
        },
        async created() {
            await WalletHistoryService.wallethistory().then((response) => {
                response.forEach(({reference: ref, unit_worth:unit, amount_paid: amount, description: des, user:User, type: status, created_at: created}) => {
                    this.paymentsData.push({
                        Reference: ref,
                        'Unit Worth':unit,
                        'Amount Paid':amount,
                        Type:status,
                        Description:des,
                        User: User,
                        Created: created,
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>