<template>
  <div class="add-trainer">
      <div class="container">
          <div class="row">
              <div class="col-md-8">


                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(sendTrainerToBackend)">

                  <div class="trainer-form">
                      <h4>Add Trainer</h4>
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="username">
                                    <vs-input state="#fd7e14" color="#fd7e14" v-model="addTrainerForm.username" placeholder="User Name">
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

                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="idNumber">
                                    <vs-input state="#fd7e14" color="#fd7e14"  v-model="addTrainerForm.idNumber" placeholder="ID Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="idNumber.errors[0]">
                                        {{ idNumber.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="email">
                                    <vs-input state="#fd7e14" color="#fd7e14"  v-model="addTrainerForm.email" placeholder="Email Address">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/email.svg" alt="">
                                        </template>
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
                                    <vs-input state="#fd7e14" color="#fd7e14" v-model="addTrainerForm.phone" placeholder="Phone Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/phone.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="phone.errors[0]">
                                        {{ phone.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                          </div>
                      </div>

                      

                        

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="age">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="number" v-model="addTrainerForm.age" placeholder="Age">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/age.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="age.errors[0]">
                                        {{ age.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="password">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="password" v-model="addTrainerForm.password" placeholder="Password">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/age.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="password.errors[0]">
                                        {{ password.errors[0] }}
                                    </span>
                                   </ValidationProvider>
                                </div>
                            </div>
                        </div>


                      





                      <div class="form-group">
                          <ValidationProvider rules="required" v-slot="address">
                          <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.address" placeholder="Address">
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
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addTrainerForm.gender" val="male">
                                        Male
                                    </vs-radio>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="addTrainerForm.gender" val="female">
                                        Female
                                    </vs-radio>
                              </div>
                          </div>

                          <div class="col-md-4">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="weight">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.weight" placeholder="Weight KG">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/weight.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="weight.errors[0]">
                                        {{ weight.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                          </div>

                          <div class="col-md-4">
                              <div class="form-group">
                                  <ValidationProvider rules="required" v-slot="height">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.height" placeholder="Height CM">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/height.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="height.errors[0]">
                                        {{ height.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                          </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="status">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.status" placeholder="Status">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/problem.svg" alt="">
                                        </template>
                                    </vs-input>
                                    <span class="text-danger" v-if="status.errors[0]">
                                        {{ status.errors[0] }}
                                    </span>
                                    </ValidationProvider>
                                </div>
                            </div>

                      </div>
                    

                    <vs-button @click="pushNewDay()"> Add New Day </vs-button>
                     <div class="trainerDay" v-for="(day,index) in trainerSchedule" :key="index">
                         <div>
                             <div>
                                 <ValidationProvider rules="required" v-slot="dayOptions">
                                 <v-select
                                    :options="day.dayOptions"
                                    v-model="day.dayName"
                                 />
                                 <span class="text-danger" v-if="dayOptions.errors[0]">
                                    {{ dayOptions.errors[0] }}
                                </span>
                                </ValidationProvider>
                             </div>
                             <div>
                                 <vs-button @click="popDay(index)" color="danger">X</vs-button>
                             </div>
                         </div>


                         <section>
                             <vs-button color="success" @click="day.dates.push({start:'',end:''})">+</vs-button>
                             <div v-for="(date,dateIndex) in day.dates" :key="dateIndex">
                                 
                                 <div style="display:flex;flex-wrap">
                                    <div style="flex:1">
                                        <label style="margin-bottom:0"> Start Time </label>

                                        <ValidationProvider rules="required" v-slot="dayOptions2">
                                        <datetime hidden-name="Strat Time" title="Start Time" input-class="form-control" v-model="date.start" type="time"></datetime>
                                        <span class="text-danger" v-if="dayOptions2.errors[0]">
                                            {{ dayOptions2.errors[0] }}
                                        </span>
                                        </ValidationProvider>
                                    </div>
                                    <div style="flex:1">
                                        <label style="margin-bottom:0"> End Time </label>

                                        <ValidationProvider rules="required" v-slot="end">
                                        <datetime title="End Time" input-class="form-control" v-model="date.end" type="time"></datetime>
                                        <span class="text-danger" v-if="end.errors[0]">
                                            {{ end.errors[0] }}
                                        </span>
                                        </ValidationProvider>
                                    </div>
                                    <div>
                                        <vs-button @click="day.dates.splice(dateIndex, 1)" style="margin-top:24px" color="danger">X</vs-button>
                                    </div>
                                 </div>
                             </div>
                         </section>
                     </div>
                    
                  </div>

                 



                  <input type="submit" class="btn btn-info" value="Add To Trainers">
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
            addTrainerForm: {},
            trainerSchedule:[
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
            ],

            dayOptions:[
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
            ],

            selectedPhoto:"",
            urlForSelectedPhoto:""
        }
    },

    /*
        {
            start:"",
            end:"",
        }
    
    */

   created(){

        this.trainerSchedule[0].dayOptions = this.dayOptions;
    },

    methods:{
        sendTrainerToBackend(){
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
            formDate.append("username", this.addTrainerForm.username);
            formDate.append("password", this.addTrainerForm.password);
            formDate.append("email", this.addTrainerForm.email);
            formDate.append("phone", this.addTrainerForm.phone);
            formDate.append("gender", this.addTrainerForm.gender);
            formDate.append("role", 'trainer');
            if(this.selectedPhoto){
                formDate.append("photo", this.selectedPhoto);
            }
            formDate.append("address", this.addTrainerForm.address);
            formDate.append("status", this.addTrainerForm.status);

            for(let i = 0 ; i < this.trainerSchedule.length ; i++){
                formDate.append(`days[${i}][day]`, this.trainerSchedule[i].dayName);
                for(let j = 0 ; j < this.trainerSchedule[i].dates.length ; j++){
                    formDate.append(`days[${i}][date][${j}][startFrom]`, this.trainerSchedule[i].dates[j].start);
                    formDate.append(`days[${i}][date][${j}][endTo]`, this.trainerSchedule[i].dates[j].end);
                }
            }

            axiosApi.post('/add-user', formDate , {
                "Content-Type": "multipart/form-data" 
            }).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Trainer Added Successfully`,
                    color:"success",
                    position:"top-center"
                });

                // Reset Data

                this.addTrainerForm = {};
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

            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close())


        },
        popDay(dayIndex){
            this.trainerSchedule.splice(dayIndex,1);
        },
        pushNewDay(){
            // let theLastIndex = this.trainerSchedule.length - 1;

            // console.log("last index ", theLastIndex )

            let tempArr = [...this.dayOptions];
            this.trainerSchedule.forEach(element => {
                let index = tempArr.findIndex(ele => ele == element.dayName);
                tempArr.splice(index,1);
            })


            this.trainerSchedule.push({
                dayOptions: tempArr,
                dayName:"",
                dates:[
                    {
                        start:"",
                        end:""
                    }
                ]
            });
        },
        
        selectImage(e){
            if(e.target.files.length > 0){
                console.log(e.target.files[0])
                this.selectedPhoto = e.target.files[0]
                this.urlForSelectedPhoto = URL.createObjectURL(this.selectedPhoto);
            }
        }
    }
}
</script>

<style lang="scss">
.add-trainer{
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

    .trainerDay{
        padding: 10px;
        background: #fff;
        border: 1px solid #2c4484ab;
        margin: 15px 0;

        #vs2__combobox{
            margin-top: 5px;
        }
        >div{
            &:first-of-type{
                display: flex;
                flex-wrap: wrap;
                div{
                    &:first-of-type{
                        flex:1;
                    }
                }
            }
        }

        .vs__clear{
            display: none;
        }
    }

    

}
</style>