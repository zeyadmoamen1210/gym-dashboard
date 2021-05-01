<template>
  <div class="edit-participant">
      <div class="container">
          <div class="row">
              <div class="col-md-8">
                  <div class="participant-form">
                      <h4>Edit Participant</h4>
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary"  v-model="form.name" placeholder="User Name">
                                        <template #icon>
                                        <img style="width:20px" src="@/assets/edit-icons/user.svg" alt="">
                                        </template>
                                    </vs-input>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary"  v-model="form.idNumber" placeholder="ID Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary"  v-model="form.email" placeholder="Email Address">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/email.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary"  v-model="form.phone" placeholder="Phone Number">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/phone.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>
                      </div>

                      

                        

                        


                      <div class="form-group">
                          <vs-input state="primary" type="number" v-model="form.age" placeholder="Age">
                            <template #icon>
                            <img style="width:20px" src="@/assets/edit-icons/age.svg" alt="">
                            </template>
                        </vs-input>
                      </div>


                      <div class="form-group">
                          <vs-input state="primary" type="text" v-model="form.address" placeholder="Address">
                            <template #icon>
                            <img style="width:20px" src="@/assets/edit-icons/home.svg" alt="">
                            </template>
                        </vs-input>
                      </div>

                      <div class="row">
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="form.gender" val="male">
                                        Male
                                    </vs-radio>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div>
                                   <vs-radio style="    margin-bottom: 15px;" v-model="form.gender" val="female">
                                        Female
                                    </vs-radio>
                              </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary" type="text" v-model="form.weight" placeholder="Weight KG">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/weight.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                    <vs-input state="primary" type="text" v-model="form.height" placeholder="Height CM">
                                        <template #icon>
                                            <img style="width:20px" src="@/assets/edit-icons/height.svg" alt="">

                                        </template>
                                    </vs-input>
                                </div>
                          </div>
                      </div>


                      



                      

                      <div class="form-group">
                          <vs-input state="primary" type="text" v-model="form.questionAnswer" placeholder="What Did You Know Us ?">
                            <template #icon>
                                <img style="width:20px" src="@/assets/edit-icons/problem.svg" alt="">

                            </template>
                        </vs-input>
                      </div>
                  </div>

                 

                  
              </div>

              <div class="col-md-4">
                    <div class="change-image">
                        <input type="file">
                      <vs-avatar size="200">
                            <img src="@/assets/personal.jpg" alt="">
                        </vs-avatar>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            form: {}
        }
    }
}
</script>

<style lang="scss">
.edit-participant{
    border:1px solid #CCC;
    padding:15px;
    .vs-input-parent--state-primary .vs-input{
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