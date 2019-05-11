<template>
    <Layout>
        <div slot="head">
            <modal name="original_details" :height="390">
                <div class="modal-header">
                   
                </div>
                <div class="modaly">
                    <p>Category name: {{Original.name}}</p>
                    <p>Customer Description: {{Original.description}}</p>
                    <p>Date: {{Original.created_at}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeOriginal" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2"><i
                            class="mdi mdi-cash-multiple"></i></span>
                        Original Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="originaData" @editOriginal="editOriginal" @viewOriginal="viewOriginal" @deleteOriginal="deleteOriginal"
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
    import {ListOriginalService} from "../../services/ListOriginal.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'editOriginal',
            args: ['AdminId'],
            text: 'Edit',
        
        },
        {
            class: 'btn btn-danger',
            callback: 'deleteOriginal',
            args: ['AdminId'],
            text: 'Delete',
        },
         {
            class: 'btn btn-primary',
            callback: 'viewOriginal',
            args: ['AdminId'],
            text: 'View',

        },
    ];

    export default {
        name: "Payment",
        data() {
            return {
                title: "Payment",
                columns: ["Cover", 'Name','Description', 'Number of Share', 'Content', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                originaData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                Original:[]
            }
        },
        async created() {
          await this.fetchOriginal();  
        },
        methods: {
            fetchOriginal() {
                this.paymentsData = [];

                ListOriginalService.listOriginal().then((response) => {
                response.forEach(({image:cover, name:music_name, content:des,  share:sha, status: status_readable,uuid: adminId}) => {
                    this.originaData.push({
                        Cover: '<img src="https://progiving-api.herokuapp.com/church_logo/' +cover +'">',
                        Name: music_name,
                        Description:des,
                        Status: status_readable,

                        'Number of Share':sha,
                        AdminId: adminId
                    });
                });
                this.loading = false;
            }).catch((err) => {
                this.isLoading = false;
                this.$toastr.error(err.message || "Payment comfirmation failed", "Error!", {timeOut: 5000});
            });
            },
            closeOriginal() {
                this.$modal.hide('original_details');
                },
            deleteOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
                ListOriginalService.deleteOriginal(adminId).then((res)=>{
                    this.isLoading = false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    this.loading = true;
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toastr.error(err.message || "Payment comfirmation failed", "Error!", {timeOut: 5000});
                });
            },
             editOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
                ListOriginalService.editOriginal(adminId).then((res)=>{
                    this.isLoading = false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    this.loading = true;
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toastr.error(err.message || "Payment comfirmation failed", "Error!", {timeOut: 5000});
                });
            },
            viewOriginal(adminId) {
                this.loadingText = "Please wait...";
                this.isLoading = true;
                ListOriginalService.viewOriginal(adminId).then((res)=>{
                    this.isLoading = false;
                    this.loading = true;
                    this.Original = res.message
                    this.$modal.show('original_details');


                }).catch((err) => {
                    this.isLoading = false;
                    this.$toastr.error(err.message || "Original  failed", "Error!", {timeOut: 5000});
                });
            },
           
        },
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>