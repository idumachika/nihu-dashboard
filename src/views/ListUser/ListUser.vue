<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
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
                                <Datatable :columns="columns" :data="userData" :loading="loading" @test="test" :actions="actions"></Datatable>
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
    import {ListUserservice} from "../../services/ListUser.Service";
    import Datatable from '../../components/Datatable/Datatable';


    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'test',
            args: ['Reference', 'User'],
            text: 'Edit'
        },
        // {
        //     class: 'btn btn-danger',
        //     actionType: 'click',
        //     callback: 'deletePay',
        //     text: 'Delete'
        // }
    ];


    export default {
        name: "Listuser",

        
        data() {
            return {
                title: "Listuser",
                columns: ['Firstname', 'Lastname', 'Username', 'Email', 'PhoneNumber', 'FullName', 'Subscription Plan', 'Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                actions: []
            }
        },
        async created() {
            await ListUserservice.ListUser().then((response) => {
                response.forEach(({fname:firstname, lname: lastname, username:user, email:mail, phone_number: phone, full_name: full, plan: plan_readable, status: status_readable}) => {
                    this.userData.push({
                        Firstname: firstname,
                        Lastname: lastname,
                        Username: user,
                        Email: mail,
                        PhoneNumber:phone,
                        FullName: full,
                        'Subscription Plan': plan_readable,
                        Status: status_readable
                        
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        components: {Layout, Datatable}
    }
</script>

<style scoped>

</style>