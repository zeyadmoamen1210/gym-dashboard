<template>
  <div class="participant">
    <div class="container">
      <div class="participant-head">
        <div>
          <h4 class="head">Participant</h4>
        </div>
        <div>
          <!-- <div class="form-group">
             <vs-input state="primary" primary v-model="search" placeholder="Search ..">
                <template #icon>
                  <img style="width:15px" src="@/assets/loupe.svg" alt="">
                </template>
              </vs-input>
          </div> -->
        </div>
      </div>
    <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th style="width: 167px">
              User ID
            </vs-th>
            <vs-th>
              Membership Type
            </vs-th>
            <vs-th>
              Start Date
            </vs-th>
            <vs-th>
              End Date
            </vs-th>
            <vs-th>
              No. Of <br/>
              Sessions
            </vs-th>
            <vs-th>
              Freezing Days
            </vs-th>
            <vs-th>
              Prefered Workout <br/> Time
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in allMemps"
            :data="tr"
          >
            <vs-td style="display:flex;    overflow: hidden;max-width: 218px;">
              <vs-avatar style="    min-width: 63px;width: 63px;" v-if="tr.user" history history-gradient>
                <img :src="tr.user.photo" alt="">
              </vs-avatar>
              <span v-if="tr.user" style="padding: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                {{ tr.user.username }}
              </span>
            </vs-td>
            <vs-td>
              <img style="width:20px" src="@/assets/history.svg" alt="">
            {{ tr.memb[tr.memb.length - 1].membershipType }}
            </vs-td>
            <vs-td>
            {{ new Date(tr.memb[0].startDate).toLocaleString() }}
            </vs-td>
            <vs-td>
            {{ new Date(tr.endDate).toLocaleString() }}
            </vs-td>
            <vs-td>
            {{ tr.memb[tr.memb.length - 1].sessions }}
            </vs-td>
            <vs-td>
              <b-progress :value="tr.Frees.allFrees - tr.Frees.residualFrees" :max="tr.Frees.allFrees" show-progress animated></b-progress>
            <!-- <div> -->
              <!-- <img style="width:20px;" v-for="x in tr.FreezingDate" :key="x" src="@/assets/snowflake.svg" alt="">
              <img style="width:20px;" v-for="y in 5 - tr.FreezingDate" :key="y" src="@/assets/snowflake-grey.svg" alt=""> -->
                  


            <!-- </div> -->
            </vs-td>
            <vs-td v-if="tr.user">
            <!-- <img style="width:20px;" v-if="tr.user.preferedTimeToWork == 'aftermoon'" src="@/assets/sun.svg" alt=""> -->
            <img style="width:20px;" v-if="tr.user.preferedTimeToWork == 'morning'" src="@/assets/sunrise.svg" alt="">
            <img style="width:20px;" v-else-if="tr.user.preferedTimeToWork == 'evening'" src="@/assets/snowflake.svg" alt="">
            <img style="width:20px;" v-else-if="tr.user.preferedTimeToWork == 'aftermoon'" src="@/assets/moon.svg" alt="">
            </vs-td>
            <vs-td style="actions">
            <!-- <vs-button
              color="whatsapp"
              circle
              icon
              floating
              @click="$router.push(`/participant/5`)"
            >
              <img style="width:15px" src="@/assets/edit.svg" alt="">
            </vs-button> -->

            <vs-button
              color="danger"
              circle
              icon
              floating
              @click="deleteTrainee(tr)"
              v-if="isAdmin()"
            >
            delete
               <!-- <img style="width:15px" src="@/assets/delete.svg" alt=""> -->
            </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer v-if="totalPages > 1">
          <vs-pagination progress v-model="page" :length="totalPages" />
        </template>
      </vs-table>
  </div>


  <vs-dialog color="danger" width="550px" not-center v-model="showDeleteDialog">
        <template #header>
          <h4 class="not-margin">
            Delete Trainee 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;" v-if="currTrainee && currTrainee.user && currTrainee.user.username"> {{currTrainee.user.username}} </span> This Trainee
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeTrainee" transparent>
              <img style="width: 20px;margin: 0 4px;" src="@/assets/trash.svg" alt=""> Ok
            </vs-button>
            <vs-button @click="showDeleteDialog=false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>

  </div>
</template>
<script>

import axiosApi from '@/plugins/axios.js';

export default {
      data:() => ({
       page:1,
       totalPages:1,
       search:"",
       allMemps: [],
       showDeleteDialog: false,
       currTrainee:{},
      }),
      created(){
        this.getMembs();
      },
      watch:{
        page(val){
          this.getMembs(val);
        },
      },
      methods:{
        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        deleteTrainee(trainee){
          this.showDeleteDialog = true;
          this.currTrainee = trainee;
          console.log(this.currTrainee)
        },
        removeTrainee(){
          const loading = this.$vs.loading;
            this.showDeleteDialog = false;
          axiosApi.post(`/deleteTrainee`, {userId: this.currTrainee.user.id}).then(() => {
            this.$vs.notification({
                    title:"Success !",
                    text:`Trainee Deleted Successfully`,
                    color:"success",
                    position:"top-center"
            });
            this.getMembs();
          }).finally(() => loading.close());
        },
        getMembs(page = 1){
          const loading = this.$vs.loading();
          axiosApi.get(`/getMemps?page=${page}`).then(res => {
            this.allMemps = res.data.docs;
            this.page = res.data.page;
            this.totalPages = res.data.totalPages;
          }).finally(() => loading.close());
        }
      },
    }
</script>

<style lang="scss">

.participant{
  padding: 15px 23px;
  .vs-table__th__content{
      display: block !important;
      margin:auto;
    }
  .vs-table__td:last-child{
      display: flex !important;
      button{
        margin: 0 3px;
      }
    }
    .vs-table__td{
      text-align: center;
    }
    .vs-table__th__content{
     font-weight: 600 !important;
     text-align: center;
   }
  .participant-head{
    display: flex;
    flex-wrap: wrap;
    div{
      &:first-of-type{
        flex:1;
        h4{
          padding-top:5px;
        }
      }
    }
   

    

    .head{
      color:#2C4484;
      font-weight: bold;
      margin-bottom: 15px;
      
    }

  }
  
}
</style>