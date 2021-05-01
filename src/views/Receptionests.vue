<template>
  <div class="all-receptionests">
      <div class="container">
          <div class="head-section">
              <div>
                  <StarHeader title="Receptionests List" />
              </div>
                <div class="search">
                    <div class="form-group" style="display:flex">
                        <vs-input @keyup.enter="searchInTrinee" state="primary" primary v-model="search" placeholder="Search ..">
                            <template #icon>
                            <img style="width:15px" src="@/assets/loupe.svg" alt="">
                            </template>
                        </vs-input>
                        <vs-button
                        style="padding: 4px 3px;border-radius: 7px;"
                            transparent
                            :active="active == 1"
                            @click="$router.push(`/add-reciptianist`)"
                        >
                            <img src="@/assets/add.svg" style="width:14px" alt="">
                        </vs-button>
                    </div>
                </div>
          </div>


          <div class="receptionests-cards">
              <div class="row">
                  <div class="col-md-4" v-for="recep in receptionsests" :key="recep.id">
                      <ReceptionestsCard  :receptionest="recep" >
                          <template slot="operations">
                               <div>
                                    <button v-if="isAdmin()" @click="pushToEdit(recep)">
                                        <img src="@/assets/pencil.svg"  alt="">
                                    </button>
                                    
                                </div>
                                <div>
                                    <button v-if="isAdmin()" @click="deleteRecp(recep)">
                                        <img src="@/assets/trash.svg" alt="">
                                    </button>
                                </div>
                          </template>
                      </ReceptionestsCard>
                  </div>
              </div>

               <div class="pagination-container" v-if="totalPages > 1">
                    <div class="center con-pagination">
                        <vs-pagination progress v-model="page" :length="totalPages" />
                    </div>
               </div>
          </div>
      </div>


        <vs-dialog color="danger" width="550px" not-center v-model="showDeleteConfirm">
        <template #header>
          <h4 class="not-margin">
            Delete Resciptionest 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;"> {{recep.username}} </span> This Resciptionest
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeRecp" transparent>
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
import axiosApi from '@/plugins/axios.js'
import ReceptionestsCard from '@/components/ReceptionestsCard'

export default {
    components:{
        StarHeader,
        ReceptionestsCard
    },
    data(){
        return{
            search:"",
            active:1,
            page:1,
            receptionsests:[],
            totalPages:1,
            recep:{},
            showDeleteConfirm: false,
        }
    },
    watch:{
        page(val){
            this.getReceptionests(val, this.search);
        }
    },
    methods:{
        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        pushToEdit(recep){
            localStorage.setItem("UserToEdit", JSON.stringify(recep));
            this.$router.push(`/edit-receptionests/${recep.id}`);
        },
        searchInTrinee(){
            
            this.getReceptionests(this.page, this.search);
        },
        deleteRecp(recep){
            this.recep = {...recep}
            this.showDeleteConfirm = true;
        },
        removeRecp(){
            const loading = this.$vs.loading();
            this.showDeleteConfirm = false;
            axiosApi.post(`/deleteResciptionest`, {userId: this.recep.id}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Resciptionest Deleted Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.getReceptionests();
            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        },
        getReceptionests(page = 1 , username = ''){
            const loading = this.$vs.loading();
            axiosApi.get(`/getUsers?role=reciptionest&page=${page}&username=${username}`).then(res => {
                this.receptionsests = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    },
    created(){
        this.getReceptionests();
    },
}
</script>

<style lang="scss" >
.all-receptionests{
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
</style>