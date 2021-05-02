<template>
  <div class="membership-page">


      <b-modal
      id="modal-prevent"
      ref="modal"
      title="Submit Your Name"
      hide-header
      hide-footer
      class="add-memb"
    >
      <div>
        <div class="center content-inputs">
            <label for=""> Title: </label>
            <vs-input style="width:100%" v-model="addMemb.title" placeholder="Title" />
        </div>


        <div style="display:flex">

            <div class="center content-inputs" style="flex:1">
                <label for=""> Duration: </label>
                <vs-input type="number" style="margin-right:5px" v-model="addMemb.duration" placeholder="Duration" />
            </div>

            <div style="flex:1">
                <label for=""> Type: </label>

                    <v-select
                    class="select-time"
                    v-model="addMemb.time"
                    :options="['Days', 'Minutes']"
                    style="background: rgba(var(--vs-gray-2), 1) !important"
                    />
            </div>


        </div>

        <div class="center content-inputs">
            <label for=""> Price: </label>
            <vs-input style="width:100%" v-model="addMemb.price" placeholder="Price" />
        </div>
        <div class="center content-inputs">
            <label for=""> Sesstion: </label>
            <vs-input style="width:100%" v-model="addMemb.sessions" placeholder="Number OF Sesstions" />        
        </div>
        <div class="center content-inputs">
            <label for=""> Frees: </label>
            <vs-input style="width:100%" v-model="addMemb.frees" type="number" placeholder="Frees" />
        </div>
        <vs-button @click="addMembership()">
            Add Membership
        </vs-button>
      </div>
    </b-modal>

      <div class="container">
          <div>
              <div class="membership-head">
                    <div style="display:flex;flex:1">
                        
                        <div>
                            <h4 class="head">Membership</h4>
                        </div>
                        
                    </div>
                    <div style="display:flex">
                    <!-- <div class="form-group" style="flex:1">
                        <vs-input state="b99236" color="#b99236" v-model="search" placeholder="Search ..">
                            <template #icon>
                            <img style="width:15px" src="@/assets/loupe.svg" alt="">
                            </template>
                        </vs-input>
                    </div> -->
                    <div style="flex:1">
                        <vs-button v-if="isAdmin()" @click="handleAddMembership">
                            +
                        </vs-button>
                    </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-3" v-for="subscription in subscriptions" :key="subscription.id">
                        <MembershipCard :subscription="subscription" >
                                <template slot="operations">
                                    <div>
                                        <button @click="
                                            $router.push(`/add-membership?type=membership&id=${subscription.id}&title=${subscription.title}&duration=${subscription.duration}&price=${subscription.price > 0 ? subscription.price : 0}&sessions=${subscription.sessions > 0 ? subscription.sessions : 0}&frees=${subscription.frees > 0 ? subscription.frees : 0}`)
                                        " style="font-size: 18px;font-weight: bold;color: #195bff;">
                                            +
                                        </button>
                                    </div>
                                    <div v-if="isAdmin()">
                                        <button @click="deleteSubscrition(subscription)">
                                            <img src="@/assets/trash.svg" alt="">
                                        </button>
                                    </div>
                                </template>
                        </MembershipCard>
                    </div>
                </div>

                <!-- <div v-if="totalPages > 1" class="pagination-container">
                    <div class="center con-pagination">
                        <vs-pagination progress v-model="page" :length="totalPages" />
                    </div>
               </div> -->

          </div>
      </div>




       <vs-dialog color="danger" width="550px" not-center v-model="showDeleteConfirm">
        <template #header>
          <h4 class="not-margin">
            Delete Subscription 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;"> {{subscription.title}} </span> This Subscription
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeSubscription" transparent>
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
import MembershipCard from '@/components/membershipCard'
import axiosApi from '@/plugins/axios.js'
export default {
    components:{
        MembershipCard
    },
    data(){
        return{
            addMembershipPopup: false,
            addMemb:{},
            subscriptions:[],
            showDeleteConfirm: false,
            subscription:{},
            // page:1,
            // totalPages:1,
        }
    },
    created(){
        this.getSubscriptions()
    },
    methods:{

        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },

        deleteSubscrition(subscription){
            this.subscription = {...subscription}
            this.showDeleteConfirm = true;
        },
        removeSubscription(){
            const loading = this.$vs.loading();
            this.showDeleteConfirm = false;
            axiosApi.post(`/delSubs`, {subscribtionId: this.subscription.id}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Membership Deleted Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.getSubscriptions();
            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        },


        getSubscriptions(){
            const loading = this.$vs.loading();
            axiosApi.get('/getSubs').then(res => {
                this.subscriptions = res.data;
                // this.page = res.data.page;
                // this.totalPages = res.data.totalPages
            }).finally(() => loading.close());
        },
        handleAddMembership(){
            this.$bvModal.show('modal-prevent')
            this.addMembershipPopup = true;
        },
        
        addMembership(){
            const loading = this.$vs.loading();
            this.$bvModal.hide('modal-prevent');

            if(this.addMemb.time == 'Days'){
                this.addMemb.duration += 'D'
            }else if (this.addMemb.time == 'Houres'){
                this.addMemb.duration += 'H'
            }else if (this.addMemb.time =='Minutes'){
                this.addMemb.duration += 'M'
            }
            
            axiosApi.post(`/add-subscription`, {
                title: this.addMemb.title,
                duration: this.addMemb.duration ,
                price: this.addMemb.price,
                frees: this.addMemb.frees,
                sessions: Number(this.addMemb.sessions)
            }).then(() => {
                this.getSubscriptions();
                this.$vs.notification({
                    title:"Success !",
                    text:`Membership Added Successfully`,
                    color:"success",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        }
    }
}
</script>

<style lang="scss">
.membership-page{
    padding: 15px 23px;
    .membership-head{
    display: flex;
    flex-wrap: wrap;
    div{
      .logo{
        h4{
          padding-top:5px;
        }
      }
    }
   

    

    .head{
          color: #b99236;
        font-weight: bold;
        margin-bottom: 0;
        font-size: 26px;
      
    }

  }
}
.modal-body{
    .vs-input{
        width: 100%;
        margin-bottom: 10px;
    }
    .select-time{
        border: 2px solid transparent;
    background: rgba(var(--vs-gray-2), 1);
    color: rgba(var(--vs-text), 1);
    padding: 7px 13px;
    border-radius: 15px;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    padding-left: 10px;

    border-radius: 8px;
    margin-top: 2px;
    padding:0;
    .vs__dropdown-toggle{
        border: none !important
    }
    }
}

</style>