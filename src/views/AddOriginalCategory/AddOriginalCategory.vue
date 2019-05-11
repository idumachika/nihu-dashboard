<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                       Add Category
                    </h3>
                </div>
            </div>
            <div class="content-wrapper  align-items-center auth">
        <Loader v-if="loading" :show-full="true" loading-text="Adding Category..."/>
            <div class="col-md-6 grid-margin stretch-card">
            <div class="card" @submit.prevent="post"> 

                <div class="card-body">
                <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Original Name</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" v-model="name"  placeholder="Fuck you challenge">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Description</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" v-model="description" placeholder="Write Here">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Upload Image </label>
                      <input type="file" class="form-control" id="exampleInputPassword1" @change="onFileChanged">
                    </div>
                  
                    
                    <button type="submit" class="btn btn-gradient-primary mr-2">Add Category</button>
                  </form>
                </div>
              </div>
            </div>
            </div>
            <!-- <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-5 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello Admin! Credit wallet</h4>
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="iduma chika"  v-model="user" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="$50000" v-model="amount_paid"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Write here ...." v-model="description"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="40000" v-model="unit_worth"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="">Top Up Wallet
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
        </div>
        
    </Layout>
</template>

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {AddOriginalCategoryService} from "../../services/AddOriginalCategory.Service";


    

    export default {
        name: 'credit',
        components: {Loader, Layout},
        data: function () {
            return {    
                name: '',
                description: '',
                image: '',
                loading: false
                }
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            onFileChanged (event) {
                    this.file = event.target.files[0]
            },
            async post() {
                this.loading = true;
                let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('description', this.description);
                bodyFormData.set('image', this.image);
                
                await AddOriginalCategoryService.addoriginal(bodyFormData).then((res)=>{
                    this.$toastr.success(res.message, {timeOut: 5000});



                }).catch((error) => {
                    this.$toastr.error(error.message, "Tv Show Failed!", {timeOut: 5000});
                });
                this.loading = false;

            }
            
        },
            
    }
</script>

