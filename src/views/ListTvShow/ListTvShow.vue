<template>
    <Layout>
         <div slot="head">
            <modal name="view_tv_show" :height="390">
                <div class="modal-header">
                </div>
                <div class="modaly">
                    <p>Category id: {{tvshowdetails.category_id}}</p>
                    <p>Description: {{tvshowdetails.content}}</p>
                    <p>Name: {{tvshowdetails.name}}</p>
                    <p>Overview : {{tvshowdetails.overview}}</p>
                    <p>Number of Share: {{tvshowdetails.share}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeTvShowCategory" class="btn btn-primary mx-auto">Close</button>
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
                                class="mdi mdi-account-card-details"></i></span>
                     Tv show
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="adminData" :loading="loading" @editTvShow="editTvShow" @viewTvShow="viewTvShow" @DeletetvShow="DeletetvShow" :actions="actions"></Datatable>
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
    import {ListTvShowService} from "../../services/ListTvShow.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
             callback: 'DeleteMusic',
            args: ['AdminId'],
            text: 'Edit'
        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            callback: 'DeleteMusic',
            args: ['AdminId'],
            text: 'Delete'
        },
        {
            class: 'btn btn-primary',
            actionType: 'click',
             callback: 'viewTvShow',
            args: ['AdminId'],
            text: 'View'
        },
    ];


    export default {
        name: "Listuser",

        
        data() {
            return {
                title: "Listuser",
                columns: ["Cover", 'Name','Description', 'Category', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                tvshowdetails:{},
                adminData: [],
                isLoading:false,
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'DeleteMusic'],
            }
        },
        async created() {
            await ListTvShowService.listtvshow().then((response) => {
                response.forEach(({ image:cover, name:music_name, description:des, category_id:id, status: status_readable,uuid: adminId}) => {
                    this.adminData.push({
                        Cover: '<img src="https://progiving-api.herokuapp.com/church_logo/' +cover +'">',
                        Name: music_name,
                        Description:des,
                        Status: status_readable,
                        Category:id,
                        AdminId: adminId
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
         methods: {
                test(adminId) {
                    window.console.log("AdminId:" + adminId);
                },
                blockUser() {
                    window.alert('Blocked User');
                },
                closeTvShowCategory() {
                this.$modal.hide('view_tv_show');
                },
                
                DeletetvShow(adminId){
                    this.loadingText = "deleting music..."
                    this.isLoading = true;
                    ListTvShowService.deleteTvshow(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
                editTvShow(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowService.editTvshow(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
                viewTvShow(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListTvShowService.viewTvshow(adminId).then((res) => {
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
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>

</style>