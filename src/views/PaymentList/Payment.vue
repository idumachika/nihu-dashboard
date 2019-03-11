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
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :handler="handleChildCall" :data="paymentsData" :loading="loading" :actions="actions">
                                <button type="button" v-bind="[{click: test}]" class="btn btn-gradient-success btn-sm">Edit</button> <button type="button" class="btn btn-sm btn-gradient-danger ">Delete</button>
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

    const action = [
                {
                    class: 'btn btn-primary',
                    actionType: 'click',
                    callback: 'test',
                    args: ['Reference', 'User'],
                    text: 'Edit'
                },
                {
                    class: 'btn btn-primary-danger',
                    actionType: 'click',
                    callback: 'delete',
                    text: 'Delete'
                }
            ]
    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ['Reference', 'Amount', 'User', 'Subscription Plan', 'Status', 'Action'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                paymentsData: [],
                actions: action
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
                window.console.log("Ref: "+ref);
                window.console.log("User: "+name);
            },
            delete() {
                window.alert('deleted');
            },
            handleChildCall: function(methodToCall, argument) {
                console.info(argument);
                console.log("this."+methodToCall+".call(["+ argument +"])");
                
                eval("this."+methodToCall+".call("+ argument +")");
            }
        },
        components: {Layout, Datatable}
    }
</script>

<style scoped>

</style>