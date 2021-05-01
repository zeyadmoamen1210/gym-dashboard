<template>
  <div class="add-trainer">
      <div class="container">
          <div class="row">
              <div class="col-md-8">
                  <div class="trainer-form">
                      <h4>Edit Trainer</h4>
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" v-model="addTrainerForm.username" placeholder="User Name">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/user.svg" alt="">
                                        </template>
                                    </vs-input>
                                </div>
                          </div>
<!-- 
                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14"  v-model="addTrainerForm.idNumber" placeholder="ID Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div> -->

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14"  v-model="addTrainerForm.email" placeholder="Email Address">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/email.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" v-model="addTrainerForm.phone" placeholder="Phone Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/phone.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>


                          <div class="col-md-6">
                                <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.address" placeholder="Address">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/home.svg" alt="">
                                        </template>
                                    </vs-input>
                                </div>
                            </div>
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

                          <!-- <div class="col-md-4">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.weight" placeholder="Weight KG">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/weight.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div> -->

                          <!-- <div class="col-md-4">
                              <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.height" placeholder="Height CM">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/height.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div> -->

                            <div class="col-md-4">
                                <div class="form-group">
                                    <vs-input state="#fd7e14" color="#fd7e14" type="text" v-model="addTrainerForm.status" placeholder="Status">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/problem.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                            </div>

                      </div>
                    

                    <vs-button @click="pushNewDay()"> Add New Day </vs-button>
                     <div class="trainerDay" v-for="(day,index) in trainerSchedule" :key="index">
                         <div style="display: flex;">
                             <div style="flex:1">
                                 <v-select
                                    :options="day.dayOptions"
                                    v-model="day.day"
                                 />
                             </div>
                             <div>
                                 <vs-button @click="popDay(index)" color="danger">X</vs-button>
                             </div>
                         </div>


                         <section>
                             <vs-button color="success" @click="day.date.push({start:'',end:''})">+</vs-button>
                             <div v-for="(date,dateIndex) in day.date" :key="dateIndex">
                                 
                                 <div style="display:flex;flex-wrap">
                                    <div style="flex:1">
                                        <label style="margin-bottom:0"> Start Time </label>
                                        <datetime hidden-name="Strat Time" title="Start Time" input-class="form-control" v-model="date.startFrom" type="time"></datetime>
                                    </div>
                                    <div style="flex:1">
                                        <label style="margin-bottom:0"> End Time </label>
                                        <datetime title="End Time" input-class="form-control" v-model="date.endTo" type="time"></datetime>
                                    </div>
                                    <div>
                                        <vs-button @click="day.date.splice(dateIndex, 1)" style="margin-top:24px" color="danger">X</vs-button>
                                    </div>
                                 </div>
                             </div>
                         </section>
                     </div>
                    
                  </div>

                 

                  <vs-button @click="sendTrainerToBackend">Update This Trainer</vs-button>
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
import axiosApi from '@/plugins/axios.js';
export default {
    created(){
        if(!this.$route.params.id || !this.$route.query.type || !localStorage.getItem('UserToEdit')){
            this.$router.push('/')
        }
        this.trainerSchedule[0].dayOptions = this.dayOptions;
        this.addTrainerForm = JSON.parse(localStorage.getItem('UserToEdit'));
        this.trainerSchedule = this.addTrainerForm.days ;
        this.trainerSchedule.forEach(ele => {
            ele.dayOptions = this.dayOptions;
            // let index = ele.dayOptions.findIndex(ele2 => ele2 == ele.day);
            // ele.dayOptions.splice(index, 1);
        });
        this.selectedPhoto = this.addTrainerForm.photo;
        this.urlForSelectedPhoto = this.addTrainerForm.photo;
    },
    data(){
        return {
            addTrainerForm: {},
            trainerSchedule:[
                {
                    dayOptions:[],
                    dayName:"",
                    date:[
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
    methods:{
        sendTrainerToBackend(){
            const loading = this.$vs.loading();
            let formDate = new FormData();
            formDate.append("username", this.addTrainerForm.username);
            formDate.append("password", this.addTrainerForm.password);
            formDate.append("userId", this.$route.params.id);
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
                formDate.append(`days[${i}][day]`, this.trainerSchedule[i].day);
                for(let j = 0 ; j < this.trainerSchedule[i].date.length ; j++){
                    formDate.append(`days[${i}][date][${j}][startFrom]`, this.trainerSchedule[i].date[j].startFrom);
                    formDate.append(`days[${i}][date][${j}][endTo]`, this.trainerSchedule[i].date[j].endTo);
                }
            }

            axiosApi.put('/updateProfileAdmin', formDate , {
                "Content-Type": "multipart/form-data" 
            }).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Trainer Added Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.$router.push(`/trainers`);

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
                let index = tempArr.findIndex(ele => ele == element.day);
                tempArr.splice(index,1);
            })


            this.trainerSchedule.push({
                dayOptions: tempArr,
                dayName:"",
                date:[
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