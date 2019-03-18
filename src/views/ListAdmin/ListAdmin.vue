<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        List User
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="adminData" :loading="loading" @UpgradeAdmin="UpgradeAdmin" :actions="actions"></Datatable>
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
    import {ListAdminservice} from "../../services/ListAdmin.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'



    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'UpgradeAdmin',
            args: ['UserId'],
            text: 'Upgrade Admin'
        },
        // {
        //     class: 'btn btn-danger',
        //     actionType: 'click',
        //     callback: 'BlockUser',
        //     text: 'Block User'
        // }
    ];


    export default {
        name: "Listuser",

        
        data() {
            return {
                title: "Listuser",
                columns: ['AdminId', 'Username', 'Email', 'LastLogin', 'Level', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                adminData: [],
                isLoading:false,
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'UpgradeAdmin'],
            }
        },
        async created() {
            await ListAdminservice.ListAdmin().then((response) => {
                response.forEach(({ username:user, email:mail, last_login: login, level:AdminLevel,  status: status_readable,uuid: adminId}) => {
                    this.adminData.push({
                        Username: user,
                        Email: mail,
                        LastLogin:login,
                        Level:AdminLevel,
                        Status: status_readable,
                        AdminId: adminId
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
         methods: {
                UpgradeAdmin(adminId) {
                    window.console.log("AdminId: " + adminId);
                },
                blockUser() {
                    window.alert('Blocked User');
                },
                
                // UpgradeAdmin(uuid){
                //     this.loadingText = "Upgradding Admin..."
                //     this.isLoading = true;
                //     ListAdminservice.upgradeAdmin(uuid).then((response) => {
                //         this.isLoading= false;
                //         this.adminData = response;
                //      this.$toastr.response(response.message, "Upgrade Admin Successfull!", {timeOut: 5000});

                        
                //     })
                    
                // }
            },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>

</style>