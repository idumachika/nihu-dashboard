    <template>
        <div class="layout">

            
        <Layout>
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
                                    <Datatable :columns="columns" :data="paymentsData" @test="test" @queryPayment="queryPayment"
                                            :loading="loading" :actions="actions"> 
                                    </Datatable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        </div>
    </template>

    <script>
        import Layout from '../../components/Layout';
        import {paymentService} from "../../services/payments.service";
        import Datatable from '../../components/Datatable/Datatable';
        import VModal from 'vue-js-modal';
        import Loader from '../../components/Loader/Loader'


        const action = [
            {
                class: 'btn btn-primary',
                callback: 'test',
                args: ['Reference', 'User'],
                text: 'Edit'
            },
            {
                class: 'btn btn-info',
                callback: 'queryPayment',
                args: ['Reference'],
                text: 'Query'

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
                    isLoading:false,
                    loadingText:"loading...",
                    queryData: {}
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
            methods: {
                test(ref, name) {
                    window.console.log("Ref: " + ref);
                    window.console.log("User: " + name);
                },
                deletePay() {
                    window.alert('deleted');
                },
                
                queryPayment(reference){
                    this.loadingText = "Querying payment..."
                    this.isLoading = true;

                    paymentService.querypayment(reference).then((response) => {
                        this.isLoading= false;
                        this.queryData = response;
                        this.$modal.show('payment-query-data', {
                            template: `
                            <p>Customer name: {{queryData.customer_name}}</p>
                            <p>Customer email: {{queryData.customer_email}}</p>
                            <p>Amount: {{queryData.amount}}</p>
                            <p>Payment type: {{queryData.payment_type}}</p>
                            <p>Gateway response: {{queryData.gateway_response}}</p>`
                        });
                    })
                    
                }
            },
            components: {
                Layout, Datatable, Loader, VModal
            }
        }
    </script>

    <style scoped>

    </style>