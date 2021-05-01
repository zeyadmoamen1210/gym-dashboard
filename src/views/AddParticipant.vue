<template>
  <div class="edit-trinee">
      <div class="container">
          <div class="row">
              <div class="col-md-8">
                  <div class="trinee-form">
                      <h4>Add Trainee</h4>

                      <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(sendTrineeToBackend)">
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="username">
                                    <vs-input state="dark"  v-model="addTrineeForm.username" placeholder="User Name">
                                    </vs-input>
                                    <span class="text-danger" v-if="username.errors[0]">
                                        {{ username.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                          </div>


                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="password">
                                    <vs-input state="dark" type="password" v-model="addTrineeForm.password" placeholder="Password">
                                    </vs-input>
                                    <span class="text-danger" v-if="password.errors[0]">
                                        {{ password.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                          </div>

                         
                      </div>
                        

                             

           

                    <div class="row">
                        <div class="col-md-6">
                             <div class="form-group">
                                 <ValidationProvider rules="required|email" v-slot="email">
                                    <vs-input state="dark"  v-model="addTrineeForm.email" placeholder="Email Address">
                                       
                                    </vs-input>
                                    <span class="text-danger" v-if="email.errors[0]">
                                        {{ email.errors[0] }}
                                    </span>
                                </ValidationProvider>
                                </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <ValidationProvider rules="required" v-slot="phone">
                                    <vs-input state="dark"  v-model="addTrineeForm.phone" placeholder="Phone Number">
                                    </vs-input>
                                    <span class="text-danger" v-if="phone.errors[0]">
                                        {{ phone.errors[0] }}
                                    </span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="col-md-6">
                             <div class="form-group">
                            <ValidationProvider rules="required" v-slot="age">
                                <vs-input state="dark" type="number" v-model="addTrineeForm.age" placeholder="Age">
                                </vs-input>
                                <span class="text-danger" v-if="age.errors[0]">
                                    {{ age.errors[0] }}
                                </span>
                            </ValidationProvider>
                    </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <ValidationProvider rules="required" v-slot="status">
                                <v-select
                                class="select-time"
                                v-model="addTrineeForm.status"
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
                    </div>
                        <div class="col-md-6">
                             <div class="form-group">
                                 <ValidationProvider rules="required" v-slot="birthdate">
                                <vs-input
                                    state="dark"
                                    type="date"
                                    v-model="addTrineeForm.birthdate"
                                > 
                                  
                                </vs-input>
                                <span class="text-danger" v-if="birthdate.errors[0]">
                                    {{ birthdate.errors[0] }}
                                </span>
                                </ValidationProvider>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <ValidationProvider rules="required" v-slot="address">
                                <vs-input state="dark" type="text" v-model="addTrineeForm.address" placeholder="Address">
                                 
                                </vs-input>
                                <span class="text-danger" v-if="address.errors[0]">
                                    {{ address.errors[0] }}
                                </span>
                                </ValidationProvider>
                            </div>
                        </div>
                    </div>

                      

                      <div class="row">
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addTrineeForm.gender" val="male">
                                        Male
                                    </vs-radio>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addTrineeForm.gender" val="female">
                                        Female
                                    </vs-radio>
                              </div>
                          </div>

                          
                      </div>

                      

                        <div class="row">

                             <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="weight">
                                    <vs-input state="dark" type="text" v-model="addTrineeForm.weight" placeholder="Weight KG">
                                    </vs-input>
                                    <span class="text-danger" v-if="weight.errors[0]">
                                        {{ weight.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="height">
                                    <vs-input state="dark" type="text" v-model="addTrineeForm.height" placeholder="Height CM">
                                    </vs-input>
                                    <span class="text-danger" v-if="height.errors[0]">
                                        {{ height.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                          </div>


                            <div class="col-md-6">
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="howDidYouKnowUs">
                                    <vs-input state="dark"  v-model="addTrineeForm.howDidYouKnowUs" placeholder="How Did You KnowUs">
                                    </vs-input>
                                    <span class="text-danger" v-if="howDidYouKnowUs.errors[0]">
                                        {{ howDidYouKnowUs.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                        <!-- <b-form-select class="vs-input" v-model="" style="background: rgba(var(--vs-dark), 0.1) !important;    border: none;border-radius: 11px;height: 41px;color: #afafaf;font-size: 14px;" :options=""  >
                                            <template #first>
                                                    <b-form-select-option :value="null" disabled>Your Prefered Time To Work</b-form-select-option>
                                                </template>
                                        </b-form-select> -->
                                        <ValidationProvider rules="required" v-slot="preferedTimeToWork">
                                        <v-select
                                            class="select-time"
                                            v-model="addTrineeForm.preferedTimeToWork"
                                            label="text"
                                            :reduce="text => text.value"
                                            :options="preferedTimeToWorkOptions"

                                         
                                            style="background:rgba(var(--vs-dark), 0.1) !important"
                                        />

                                        <span class="text-danger" v-if="preferedTimeToWork.errors[0]">
                                            {{ preferedTimeToWork.errors[0] }}
                                        </span>
                                        </ValidationProvider>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                     <ValidationProvider rules="required" v-slot="lastGym">
                                    <vs-input state="dark"  v-model="addTrineeForm.lastGym" placeholder="Last Gym">
                                    </vs-input>
                                    <span class="text-danger" v-if="lastGym.errors[0]">
                                        {{ lastGym.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                            </div>

                             <div class="col-md-6">
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="termination">
                                    <vs-input state="dark"  v-model="addTrineeForm.termination" placeholder="Reasons Of Termination">
                                    </vs-input>
                                    <span class="text-danger" v-if="termination.errors[0]">
                                        {{ termination.errors[0] }}
                                    </span>
                                    </ValidationProvider>
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


                       <!-- <button ></button> -->
                       <input type="submit" class="btn btn-info" value="Add Trainee"> 
                      </form>
                    </ValidationObserver>
                  </div>

                

                  
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
            email:"",
            addTrineeForm: {
                preferedTimeToWork: null
            },
            urlForSelectedPhoto:"",
            preferedTimeToWorkOptions:[
                {text:"Aftermoon", value:"aftermoon"},
                {text:"Morning", value:"morning"},
                {text:"Evening", value:"evening"}
            ],
            statusOptions:[
                {text:"Single", value:"single"},
                {text:"Married", value:"married"},
                {text:"Separated", value:"separated"},
                {text:"Widower", value:"widower"}
            ]
        }
    },
   
    methods:{
         selectImage(e){
            if(e.target.files.length > 0){
                console.log(e.target.files[0])
                this.selectedPhoto = e.target.files[0]
                this.urlForSelectedPhoto = URL.createObjectURL(this.selectedPhoto);
            }
        },
        sendTrineeToBackend(){
            if(!this.urlForSelectedPhoto || !this.selectImage){
                this.$vs.notification({
                    title:"Data Must Be Full !",
                    text:`Please Add Photo For This Trainee`,
                    color:"danger",
                    position:"top-center"
                });
                return;
            }
            const loading = this.$vs.loading();
            let formDate = new FormData();
            formDate.append("username", this.addTrineeForm.username);
            formDate.append("password", this.addTrineeForm.password);
            formDate.append("email", this.addTrineeForm.email);
            formDate.append("phone", this.addTrineeForm.phone);
            formDate.append("gender", this.addTrineeForm.gender);
            formDate.append("role", 'trainee');
            if(this.selectedPhoto){
                formDate.append("photo", this.selectedPhoto);
            }
            formDate.append("address", this.addTrineeForm.address);
            formDate.append("termination", this.addTrineeForm.termination);
            formDate.append("weight", this.addTrineeForm.weight);
            formDate.append("height", this.addTrineeForm.height);
            formDate.append("howDidYouKnowUs", this.addTrineeForm.howDidYouKnowUs);
            formDate.append("preferedTimeToWork", this.addTrineeForm.preferedTimeToWork);
            formDate.append("lastGym", this.addTrineeForm.lastGym);
            formDate.append("status", this.addTrineeForm.status);



            let x = new Date(this.addTrineeForm.birthdate).getMonth() + 1;
            let y = new Date(this.addTrineeForm.birthdate).getDate();
            let z = new Date(this.addTrineeForm.birthdate).getFullYear();

            console.log(y + '-' + x + '-' + z);

            console.log(x);
            console.log(y);
            formDate.append("birthdate", x + '-' + y + '-' + z);
            console.log(z);



            axiosApi.post('/add-user', formDate , {
                "Content-Type": "multipart/form-data" 
            }).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Trainee Added Successfully`,
                    color:"success",
                    position:"top-center"
                });

                // Reset Data
              

                this.addTrineeForm = {
                    preferedTimeToWork: null
                };
                
                this.selectedPhoto = "";
                this.urlForSelectedPhoto = "";


                this.$router.push(`/trainees`);

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
.edit-trinee{
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