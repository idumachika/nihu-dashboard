<template>
    <Layout>
        <div slot="head">
            <modal name="view_tv_show" :height="390">
                <div class="modal-header">
                </div>
                <div class="modaly">
                    <img v-bind:src="tvshowdetails.image">
                    <p>Category name: {{tvshowdetails.name}}</p>
                    <p>Category id: {{tvshowdetails.category_id}}</p>
                    <p>Category Description: {{tvshowdetails.description}}</p>
                  
                    
                </div>
                <div class="modal-footer">
                    <button @click="closeTvShowCategory" class="btn btn-primary mx-auto">Close</button>
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
                        Tv Show Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="paymentsData" @DeletetvShowCategory="DeletetvShowCategory" @viewtvshowCategory="viewtvshowCategory"
                                           @editTvShowCategory="editTvShowCategory"
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
    import {ListTvShowCategoryservice} from "../../services/ListTvShowCategory.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'confirmPayment',
            args: ['AdminId'],
            text: 'Edit',
            
        },
        {
            class: 'btn btn-danger',
            callback: 'DeletetvShowCategory',
            args: ['AdminId'],
            text: 'Delete',
        },
        {
            class: 'btn btn-primary',
            callback: 'viewtvshowCategory',
            args: ['AdminId'],
            text: 'View',
            
        },

    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ["Cover", 'Name','Description', 'Overview','Share', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                paymentsData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                tvshowdetails:{}
               
            }
        },
        async created() {
          await this.fetchPayments();  
        },
       
        methods: {
            fetchPayments() {
                this.paymentsData = [];

                ListTvShowCategoryservice.listCategory().then((response) => {
                response.forEach(({image:cover, name:music_name, description:des, overview:view, share:music_share, status: status_readable,uuid: adminId}) => {
                    this.paymentsData.push({
                        Cover: '<img src="https://progiving-api.herokuapp.com/church_logo/' +cover +'">',
                        Name: music_name,
                        Description:des,
                        Status: status_readable,
                        Overview:view,
                        Share:music_share,
                        AdminId:adminId
                    });
                });
                this.loading = false;
            }).catch((err) => {
                this.isLoading = false;
                this.$toastr.error(err.message || "Loading List Failed", "Error!", {timeOut: 5000});
            });
            },
             closeTvShowCategory() {
            this.$modal.hide('view_tv_show');
            },

           
            DeletetvShowCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowCategoryservice.deletetvshowCategory(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
            editTvShowCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowCategoryservice.edittvshowCategory(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
            viewtvshowCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowCategoryservice.viewtvshowCategory(adminId).then((res) => {
                    this.isLoading= false;
                    this.tvshowdetails  = res.message
                    this.$modal.show('view_tv_show');
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                }
        
            
            
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>