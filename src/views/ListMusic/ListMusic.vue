<template>
    <Layout>
        <div slot="head">
            <modal name="music_details" :height="390">
                <div class="modaly">
                    <p> <img alt="" :src="musicData.image"/></p>
                    <p>Category id: {{musicData.category_id}}</p>
                    <!-- <p>Category name: {{musicData.category_name}}</p> -->
                    <p> Music Description: {{musicData.description}}</p>
                    <p>Music Name: {{musicData.name}}</p>
                    <p>Number Of share: {{musicData.share}}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeMusic" class="btn btn-primary mx-auto">Close</button>
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
                     Music List
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="adminData" :loading="loading" @ViewMusic="ViewMusic" @EditMusic="EditMusic" @DeleteMusic="DeleteMusic" :actions="actions"></Datatable>
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
    import {ListMusicservice} from "../../services/ListMusic.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'EditMusic',
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
            callback: 'ViewMusic',
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
                adminData: [],
                musicData:{},
                isLoading:false,
                actions: action,
                loadingText:"please wait...",
                callbacks: ['test', 'DeleteMusic'],
            }
        },
        async created() {
            await ListMusicservice.listmusic().then((response) => {
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
                closeMusic() {
                this.$modal.hide('music_details');
                },
                
                DeleteMusic(adminId){
                    this.loadingText = "deleting music..."
                    this.isLoading = true;
                    ListMusicservice.deleteMusic(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
                EditMusic(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListMusicservice.editMusic(adminId).then((res) => {
                    this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                    }).catch((error) => {
                    this.$toastr.error(error.message, "delete Unsuccessfull!", {timeOut: 5000});
                    this.isLoading= false;

                    });
                            
                },
                ViewMusic(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListMusicservice.viewMusic(adminId).then((res) => {
                    this.isLoading= false;
                    window.console.log(res)
                    this.musicData = res.message
                    this.$modal.show('music_details');
                    }).catch((error) => {
                      window.console.log(error)
                    this.isLoading= false;

                });
                            
            }
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>

</style>