<template>
    <Layout>
         <div slot="head">
            <modal name="music_details" :height="390">
                <div class="modaly">
                    <img alt="" :src="detailCategory.image"/>
                    <p> Music Description: {{detailCategory.description}}</p>
                    <p>Music Name: {{detailCategory.name}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeCategory" class="btn btn-primary mx-auto">Close</button>
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
                        List Category
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="userData" :loading="loading" @ViewCategory="ViewCategory" @DeleteCategory="DeleteCategory" @EditCategory="EditCategory" :actions="actions"></Datatable>
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
    import {ListCategoryservice} from "../../services/ListCategoryService";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'EditCategory',
            args: ['AdminId'],
            text: 'Edit'
        },
        {
            class: 'btn btn-danger',
            actionType: 'click',
            args: ['AdminId'],
            callback: 'DeleteCategory',
            text: 'Delete'
        },
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewCategory',
            args: ['AdminId'],
            text: 'View'
        },
    ];


    export default {
        name: "Listuser",

        
        data() {
            return {
                title: "Listuser",
                columns: [ "Cover", 'Name','Description',  'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                isLoading:false,
                actions: action,
                detailCategory:[],
                loadingText:"loading...",
                callbacks: ['test', 'DeleteCategory'],
            }
        },
        async created() {
            await ListCategoryservice.listCategory().then((response) => {
                response.forEach(({image:cover, name:music_name, description:des,  status: status_readable,uuid: adminId}) => {
                    this.userData.push({
                        Cover: '<img src="https://progiving-api.herokuapp.com/church_logo/' +cover +'">',
                        Name: music_name,
                        Description:des,
                        Status: status_readable,
                        AdminId: adminId
                        
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
         methods: {
                test(adminId) {
                    window.console.log("Userid: " + adminId);
                },
                blockUser() {
                    window.alert('Blocked User');
                },
                closeCategory() {
                this.$modal.hide('music_details');
                },
                DeleteCategory(adminId){
                    this.loadingText = "Deleting Category..."
                    this.isLoading = true;
                    ListCategoryservice.deleteCategory(adminId).then((res) => {
                        this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});

                        
                    }).catch((err) => this.$toastr.error(err.message || "Delete failed", "Error!", {timeOut: 5000}));

                    
                },
                EditCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListCategoryservice.editCategory(adminId).then((res) => {
                        this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((err) => this.$toastr.error(err.message || "Edit failed", "Error!", {timeOut: 5000}));

            },
                ViewCategory(adminId){
                    this.loadingText = "please wait...."
                    this.isLoading = true;
                    ListCategoryservice.viewCategory(adminId).then((res) => {
                        this.detailCategory = res.message;
                        this.isLoading= false;
                        this.$modal.show('music_details');
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((err) => this.$toastr.error(err.message || "View failed", "Error!", {timeOut: 5000}));

                    
                }
            },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>

</style>