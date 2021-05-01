<template>
  <div class="edit-sales">
      <div class="container">
          <div class="row">
              <div class="col-md-8">
                  <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(sendSalesToBackend)">
                  <div class="sales-form">
                      <h4>Edit Sales</h4>
                      <div class="row">
                          <div class="col-md-12">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="username">
                                    <vs-input state="dark"  v-model="addSalesForm.username" placeholder="User Name">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/user.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="username.errors[0]">
                                        {{ username.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                          </div>

                          <!-- <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="password">
                                    <vs-input state="dark" type="password" v-model="addReceptionestForm.password" placeholder="Password">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="password.errors[0]">
                                        {{ password.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                          </div> -->

                         
                      </div>

                      

                              <div class="form-group">
                                  <ValidationProvider rules="required|email" v-slot="email">
                                    <vs-input state="dark"  v-model="addSalesForm.email" placeholder="Email Address">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/email.svg" alt="">

                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="email.errors[0]">
                                        {{ email.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>

                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="phone">
                                    <vs-input state="dark"  v-model="addSalesForm.phone" placeholder="Phone Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/phone.svg" alt="">

                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="phone.errors[0]">
                                        {{ phone.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>

                        

                      
                    <!-- <div class="form-group">
                         <ValidationProvider rules="required" v-slot="age">
                        <vs-input state="dark" type="number" v-model="addReceptionestForm.age" placeholder="Age">
                            <template #icon>
                            <img style="width:20px" src="@/assets/edit-icons/age.svg" alt="">
                            </template>
                        </vs-input>
                        <span class="text-danger" v-if="age.errors[0]">
                            {{ age.errors[0] }}
                        </span>
                        </ValidationProvider>
                    </div> -->
                          
                      

                      <div class="form-group">

                            <ValidationProvider rules="required" v-slot="status">
                                <v-select
                                class="select-time"
                                v-model="addSalesForm.status"
                                label="text"
                                :reduce="text => text.value"
                                :options="statusOptions"
                                style="background:rgba(var(--vs-dark), 0.1) !important"
                                />
                            <span class="text-danger" v-if="status.errors[0]">
                                    {{ status.errors[0] }}
                            </span>
                            </ValidationProvider>
                        </div>


                      <div class="form-group">
                          <ValidationProvider rules="required" v-slot="address">
                          <vs-input state="dark" type="text" v-model="addSalesForm.address" placeholder="Address">
                            <template #icon>
                            <img style="width:20px" src="@/assets/edit-icons/home.svg" alt="">
                            </template>
                        </vs-input>
                        <span class="text-danger" v-if="address.errors[0]">
                            {{ address.errors[0] }}
                        </span>
                        </ValidationProvider>
                      </div>

                      <div class="row">
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addSalesForm.gender" val="male">
                                        Male
                                    </vs-radio>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addSalesForm.gender" val="female">
                                        Female
                                    </vs-radio>
                              </div>
                          </div>

                          
                      </div>


                      



                      
<!-- 
                      <div class="form-group">
                          <vs-input state="dark" type="text" v-model="addReceptionestForm.addReceptionestForm" placeholder="What Did You Know Us ?">
                            <template #icon>
                                <img style="width:20px" src="@/assets/edit-icons/problem.svg" alt="">

                            </template>
                        </vs-input>
                      </div> -->
                  </div>
                    <input type="submit" class="btn btn-info" value="Edit Sales">
                    </form>
                  </ValidationObserver>
              </div>

               <div class="col-md-4">
                    <div class="change-image">
                        <input @change="selectImage" type="file">
                      <vs-avatar v-if="!urlForSelectedPhoto" size="200">
                            <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                        </vs-avatar>
                        <vs-avatar v-else size="200">
                            <img :src="urlForSelectedPhoto" alt="">
                        </vs-avatar>
                    </div>
              </div>

          </div>
      </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'

export default {
    data(){
        return {
            addSalesForm: {},
            urlForSelectedPhoto:"",
            selectedPhoto:"",
            statusOptions:[
                {text:"Single", value:"single"},
                {text:"Married", value:"married"},
                {text:"Separated", value:"separated"},
                {text:"Widower", value:"widower"}
            ]
        }
    },


    created(){
        if(!this.$route.params.id || !localStorage.getItem('UserToEdit')){
            this.$router.push('/')
        }
        this.addSalesForm = JSON.parse(localStorage.getItem('UserToEdit'));
        this.selectedPhoto = this.addSalesForm.photo;
        this.urlForSelectedPhoto = this.addSalesForm.photo;

    },
   
    methods:{
         selectImage(e){
            if(e.target.files.length > 0){
                console.log(e.target.files[0])
                this.selectedPhoto = e.target.files[0]
                this.urlForSelectedPhoto = URL.createObjectURL(this.selectedPhoto);
            }
        },
        sendSalesToBackend(){
            if(!this.urlForSelectedPhoto || !this.selectImage){
                this.$vs.notification({
                    title:"Data Must Be Full !",
                    text:`Please Add Photo For This Sales`,
                    color:"danger",
                    position:"top-center"
                });
                return;
            }
            const loading = this.$vs.loading();
            let formDate = new FormData();
            formDate.append("username", this.addSalesForm.username);
            // formDate.append("password", this.addReceptionestForm.password);
            formDate.append("email", this.addSalesForm.email);
            formDate.append("phone", this.addSalesForm.phone);
            formDate.append("gender", this.addSalesForm.gender);
            // formDate.append("age", this.addReceptionestForm.age);
            formDate.append("role", 'salles');
            formDate.append("userId", this.$route.params.id);
            if(this.selectedPhoto){
                formDate.append("photo", this.selectedPhoto);
            }
            formDate.append("address", this.addSalesForm.address);
            formDate.append("status", this.addSalesForm.status);

            axiosApi.put('/updateProfileAdmin', formDate , {
                "Content-Type": "multipart/form-data" 
            }).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Sales Added Successfully`,
                    color:"success",
                    position:"top-center"
                });


                // Reset Data

                this.addSalesForm = {};
                this.trainerSchedule = [
                    {
                        dayOptions:[],
                        dayName:"",
                        dates:[
                            {
                                start:"",
                                end:""
                            }
                        ]
                    }
                ];
                this.selectedPhoto = "";
                this.urlForSelectedPhoto = "";

                this.$router.push(`/sales`);
            }).catch((error) => {
                
                this.$vs.notification({
                    title:"Failed !",
                    text:error.response.data.message,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close())


        },
    }
}
</script>

<style lang="scss">
.edit-sales{
    border:1px solid #CCC;
    padding:15px;
    .vs-input{
        width: 100% !important;
    }

    .change-image{
        position: relative;
    height: 186px;
    width: 211px;
        input, .vs-avatar-content{
            position: absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
        }
        input{
            opacity: 0;
            cursor: pointer;
            z-index: 33;
        }
    }

}
</style>