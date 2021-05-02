<template>
  <div class="all-trainers">
    <b-modal id="show-attendance" hide-footer>
         <template #modal-title>
            Monthly Attendance
         </template>
       <div>
            <label for=""> Select Date </label>
            <datetime style="width:100%" hidden-name="Strat Date" title="Start Date" input-class="select-time" v-model="attendanceDate" type="date"></datetime>
            <div v-for="att in currAtt" :key="att._id" style="display:flex;padding:5px">
                <template  v-if="currAtt.length > 0">
                    <div style="flex:1">
                        {{att._id}}
                    </div>
                    <div v-if="att && !att.conflict">
                        <vs-tooltip color="#d63031">
                            <template #tooltip>
                                <span style="font-weight:bold">Conflict</span>
                            </template>
                        <span style="height:10px;width:10px;background:#d63031;border-radius:50%;display: block;margin-top: 4px;"></span>
                        </vs-tooltip>
                    </div>
                    <div v-else>
                        <vs-tooltip color="#00b894">
                            <template #tooltip>
                                <span style="font-weight:bold">Perfect</span>
                            </template>
                        <span style="height:10px;width:10px;background:#00b894;border-radius:50%;display: block;margin-top: 4px;"></span>
                        </vs-tooltip>
                    </div>
                </template>
            </div>
        </div>
    </b-modal>


      <div class="container">
          <div class="head-section">
              <div>
                  <StarHeader title="Trainers List" />
              </div>
                <div class="search">
                    <div class="form-group" style="display:flex">
                        <vs-input state="primary" primary v-model="search" @keyup.enter="searchInTrainers" placeholder="Search ..">
                            <template #icon>
                            <img style="width:15px" src="@/assets/loupe.svg" alt="">
                            </template>
                        </vs-input>
                        <vs-button
                        style="padding: 4px 3px;border-radius: 7px;"
                            transparent
                            :active="active == 1"
                            @click="$router.push(`/add-trainer`)"
                        >
                            <img src="@/assets/add.svg" style="width:14px" alt="">
                        </vs-button>
                    </div>
                </div>
          </div>


          <div class="trainers-cards">
              <div class="row">
                  <div class="col-md-4" v-for="trainer in trainers" :key="trainer.id">
                      <TrainerCard :trainer="trainer" >
                          <template slot="operations">
                               <div>
                                    <button v-if="isAdmin()" @click="pushTrainerToEdit(trainer)">
                                        <img src="@/assets/pencil.svg"  alt="">
                                    </button>
                                    
                                </div>
                                <div>
                                    <button v-if="isAdmin()" @click="deleteTrainer(trainer)">
                                        <img src="@/assets/trash.svg" alt="">
                                    </button>
                                </div>
                                <div>
                                    <button @click="getAttendance(trainer)">
                                        <!-- <img src="@/assets/trash.svg" alt=""> -->
                                        <img src="@/assets/checking-attendance.svg" alt="">

                                        
                                    </button>
                                </div>
                          </template>
                      </TrainerCard>
                  </div>
              </div>

               <div v-if="totalPages > 1" class="pagination-container">
                    <div class="center con-pagination">
                        <vs-pagination progress v-model="page" :length="totalPages" />
                    </div>
               </div>
          </div>
      </div>


      <vs-dialog color="danger" width="550px" not-center v-model="showDeleteConfirm">
        <template #header>
          <h4 class="not-margin">
            Delete Trainer 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;"> {{trainer.username}} </span> This Trainer
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeTrainer" transparent>
              <img style="width: 20px;margin: 0 4px;" src="@/assets/trash.svg" alt=""> Ok
            </vs-button>
            <vs-button @click="showDeleteConfirm=false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>


  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
import TrainerCard from '@/components/TrainerCard'
import axiosApi from '@/plugins/axios.js'

export default {
    components:{
        StarHeader,
        TrainerCard
    },
    watch:{
        page(val){
            this.getTrainers(val, this.search);
        },
        attendanceDate(val){
            let loading = this.$vs.loading();
            
            axiosApi.post(`/monthlyAttendanceAdmin?id=${this.currTrainer.id}`, {
                date: this.$moment.utc(this.$moment(val).startOf('month')).format(),
                month: Number(this.$moment(val).format('M'))
            }).then(res => {
                this.currAtt = res.data;
            }).finally(() => loading.close())
        },
    },
    created(){
        this.getTrainers();
    },
    methods:{
       isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        searchInTrainers(){
            this.getTrainers(this.page, this.search)
        },
        pushTrainerToEdit(trainer){
            localStorage.setItem("UserToEdit", JSON.stringify(trainer));
            this.$router.push(`/edit-user/${trainer.id}?type=trainer`);
        },
        getAttendance(trainer){
            this.currAtt = [];
            this.attendanceDate = ""
            this.currTrainer = {...trainer};
            this.$bvModal.show('show-attendance');
            
        },
        deleteTrainer(trainer){
            this.trainer = {...trainer}
            this.showDeleteConfirm = true;
        },
        removeTrainer(){
            const loading = this.$vs.loading();
            this.showDeleteConfirm = false;
            axiosApi.post(`/deleteTrainer`, {userId: this.trainer.id}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Trainer Deleted Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.getTrainers();
            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        },

        getTrainers(page = 1, username = ''){
            const loading = this.$vs.loading();
            axiosApi.get(`/getUsers?role=trainer&page=${page}&username=${username}`).then(res => {
                this.trainers = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    },
    data(){
        return{
            getAttendancePopup: false,
            search:"",
            active:1,
            page:1,
            trainer:{},
            totalPages:1,
            trainers: [],
            showDeleteConfirm:false,
            attendanceDate:"",
            currAtt:[],
            currTrainer:{}
        }
    }
}
</script>

<style lang="scss" >
.all-trainers{
    .head-section{
        display: flex;
        flex-wrap: wrap;
        padding:16px 0 0 0;
        >div{
            &:first-of-type{
                flex: 1;
            }
        }
        .search{
            padding:0px 16px;
        }
    }
    .pagination-container{
        margin:auto;
        text-align: center;
        .center.con-pagination{
            display:inline-block;
            margin-bottom: 25px;
        }
    }
    
}

  .select-time{
        border: 2px solid transparent;
        background: rgba(var(--vs-dark), 0.1) !important;
        color: rgba(var(--vs-text), 1);
        padding: 7px 13px;
        border-radius: 15px;
        -webkit-transition: all 0.25s ease;
        transition: all 0.25s ease;
        padding-left: 10px;
        height: 40px;
        border-radius: 8px;
        margin-top: 2px;
        width:100%;
        padding:0;
    .vs__dropdown-toggle{
        border: none !important
    }
    }
</style>