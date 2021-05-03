<template>
  <div class="all-sales">
      <div class="container">
          <div class="head-section">
              <div>
                  <StarHeader title="Sales List" />
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
                            @click="$router.push(`/add-sales`)"
                        >
                            <img src="@/assets/add.svg" style="width:14px" alt="">
                        </vs-button>
                    </div>
                </div>
          </div>

            <NoData v-if="sales.length == 0" /> 
          <div class="sales-cards" v-else>
              <div class="row">
                  <div class="col-md-4" v-for="sale in sales" :key="sale.id">
                      <SalesCard :sales="sale" >

                          <template slot="password-attendance">
                            
                                <div>
                                    <vs-button @click="forgetPasswordMethod(sale)" success transparent active>password</vs-button>
                                </div>
                          </template>

                          <template slot="operations">
                               <div>
                                    <button v-if="isAdmin()" @click="pushToEdit(sale)">
                                        <img src="@/assets/pencil.svg"  alt="">
                                    </button>
                                    
                                </div>
                                <div>
                                    <button v-if="isAdmin()" @click="deleteSale(sale)">
                                        <img src="@/assets/trash.svg" alt="">
                                    </button>
                                </div>
                          </template>
                      </SalesCard>
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
            Delete Sales 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;"> {{sale.username}} </span> This Sales
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeSale" transparent>
              <img style="width: 20px;margin: 0 4px;" src="@/assets/trash.svg" alt=""> Ok
            </vs-button>
            <vs-button @click="showDeleteConfirm=false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>







      <vs-dialog class="forget-password" v-model="forgetPasswordPopup">
        <template #header>
          <h4 class="not-margin">
            Change Password
          </h4>
        </template>


        <div class="con-form">
        <h6>Change Password For <span style="color: var(--primary);display:block;font-weight:200">{{attendance.username}}</span> </h6>
          <vs-input @keyup.enter.native="updatePass" style="width: 100%;" type="password" v-model="forgetPassword" placeholder="Password">
            <template #icon>
              <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">
            </template>
          </vs-input>
          
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block @click="updatePass">
              Update Password
            </vs-button>

          </div>
        </template>
      </vs-dialog>

  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
import axiosApi from '@/plugins/axios.js'
import SalesCard from '@/components/SalesCard'
import NoData from '@/components/NoData'


export default {
    components:{
        StarHeader,
        SalesCard,
        NoData
    },
    data(){
        return{
            forgetPasswordPopup:false,
            forgetPassword:"",
            attendance:{},
            search:"",
            active:1,
            page:1,
            sales:[],
            totalPages:1,
            sale:{},
            showDeleteConfirm: false,
        }
    },
    watch:{
        page(val){
            this.getSales(val, this.search);
        }
    },
    methods:{
        updatePass(){
            this.forgetPasswordPopup = false;
            const loading = this.$vs.loading();
            axiosApi.post(`/changePassword?id=${this.attendance.id}`, {password: this.forgetPassword}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Password Updated Successfully For ${this.attendance.username}`,
                    color:"success",
                    position:"top-center"
                });
                this.forgetPassword = "";
            }).finally(() => loading.close())
        },
        forgetPasswordMethod(trinee){
            this.forgetPasswordPopup = true;
            this.attendance = {...trinee}
        },
        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        pushToEdit(sale){
            localStorage.setItem("UserToEdit", JSON.stringify(sale));
            this.$router.push(`/edit-sales/${sale.id}`);
        },
        searchInTrinee(){
            
            this.getSales(this.page, this.search);
                
            
        },
        deleteSale(sale){
            this.sale = {...sale}
            this.showDeleteConfirm = true;
        },
        removeSale(){
            const loading = this.$vs.loading();
            this.showDeleteConfirm = false;
            axiosApi.post(`/deleteSalle`, {userId: this.sale.id}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Sales Deleted Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.getSales();
            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        },
        getSales(page = 1 , username = ''){
            const loading = this.$vs.loading();
            axiosApi.get(`/getUsers?role=salles&page=${page}&username=${username}`).then(res => {
                this.sales = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    },
    created(){
        this.getSales();
    },
}
</script>

<style lang="scss" >
.all-sales{
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

.forget-password{
    .vs-input--has-icon {
    padding-left: 38px;
    width: 100%;
}
}
</style>