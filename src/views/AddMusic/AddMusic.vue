<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Add Music
                    </h3>
                </div>
            </div>
            <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-6 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello  Admin! Add Music </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Music Name"  v-model="name" required>
                                </div>
                                <div class="form-group">
                                    <input type="textarea" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Write Here..." v-model="description"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Category"  v-model="category_id" required>
                                </div>
                                <div class="form-group">
                                    <input  class="form-control form-control-lg"
                                           id="exampleInputPassword1" type="file" accept="image/*"  @change="onImageChanged"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="file" class="form-control form-control-lg"
                                           id="exampleInputPassword1"  accept="image/*"  @change="onFileChanged"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Add Music
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
        </div>
        
    </Layout>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {AddMusicService} from "../../services/AddMusic.Service";


    

    export default {
        name: 'admin',
        components: {Loader, Layout},
        data: function () {
            return {    
                name: '',
                description: '',
                image: '', 
                file: '', 
                category_id:'',
                loading: false}
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            onImageChanged (event) {
                    this.image = event.target.files[0]
            },
            onFileChanged (event) {
                    this.file = event.target.files[0]
            },
            async post() {
               this.loading = true;
                let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('description', this.description);
                bodyFormData.set('image', this.image);
                bodyFormData.set('file', this.file);
                bodyFormData.set('category_id', this.category_id);
                await AddMusicService.addmusic(bodyFormData).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "Music  Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>