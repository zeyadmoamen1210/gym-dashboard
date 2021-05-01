<template>
  <div class="payments">
    <div class="container">
      <div class="payments-head">
        <div>
          <h4 class="head">Payments</h4>
        </div>
        <!-- <div>
          <div class="form-group">
             <vs-input state="primary" primary v-model="search" placeholder="Search ..">
                <template #icon>
                  <img style="width:15px" src="@/assets/loupe.svg" alt="">
                </template>
              </vs-input>
          </div>
        </div> -->
      </div>
      <!-- {{payments}} -->
    <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th>
              User ID
            </vs-th>
            <!-- <vs-th>
              Membership Type
            </vs-th> -->
            <vs-th>
              Created At
            </vs-th>
            <vs-th>
              Total Recived
            </vs-th>
            <vs-th>
              Obligated <br/> Amount
            </vs-th>
            <!-- <vs-th>
              Total Recived
            </vs-th> -->
            <vs-th>
              Last Invoice
            </vs-th>
            <vs-th>
              Target
            </vs-th>
            <vs-th>
              Next Due<br/> One
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in payments"
            :data="tr"
          >
          
             <vs-td style="display:flex">
              <vs-avatar history history-gradient>
                <img :src="tr.user.photo" alt="">
              </vs-avatar>
              <span style="    padding: 10px;">
                {{ tr.user.username }}
              </span>
            </vs-td>
            <!-- <vs-td>
              <img style="width:20px" src="@/assets/history.svg" alt="">
            {{ tr.membershipType }}
            </vs-td> -->
            <vs-td>
            {{ new Date(tr.createdAt).toLocaleDateString() }}
            </vs-td>
            <vs-td>
                <img style="width:20px" src="@/assets/money-bag-with-dollar-symbol.svg" alt="">
            {{ tr.Obligation.TotalRecieved }}
            </vs-td>
            <vs-td>
            {{ tr.Obligation.Obligation }}
            </vs-td>
            <!-- <vs-td>
            {{ tr.Obligation.TotalRecieved }}
            </vs-td> -->
            
            <vs-td >
                <vs-tooltip color="#ffc107" v-if="tr.dateObligation[tr.dateObligation.length-1].status == 'upcoming'">
                    <template #tooltip>
                        <span style="font-weight:bold">Upcoming</span>
                    </template>
                    <div  style="    background: #ffc107;height: 8px;width: 8px;border-radius: 50%;display: inline-block;margin: 0 3px;"></div>
                    {{new Date(tr.dateObligation[tr.dateObligation.length-1].date).toLocaleDateString()}}
                </vs-tooltip>
                <vs-tooltip color="#25D366" v-else-if="tr.dateObligation[tr.dateObligation.length-1].status == 'upcoming'">
                    <template #tooltip>
                        <span style="font-weight:bold">Paid</span>
                    </template>
                    <div  style="    background: #25D366;height: 8px;width: 8px;border-radius: 50%;display: inline-block;margin: 0 3px;"></div>
                    {{new Date(tr.dateObligation[tr.dateObligation.length-1].date).toLocaleDateString()}}
                </vs-tooltip>
                <vs-tooltip color="danger" v-else-if="tr.dateObligation[tr.dateObligation.length-1].status == 'draft'">
                    <template #tooltip>
                        <span style="font-weight:bold">Draft</span>
                    </template>
                    <div  style="    background: #25D366;height: 8px;width: 8px;border-radius: 50%;display: inline-block;margin: 0 3px;"></div>
                    {{new Date(tr.dateObligation[tr.dateObligation.length-1].date).toLocaleDateString()}}
                </vs-tooltip>
                

                <vs-tooltip color="primary" v-else>
                    <template #tooltip>
                        <span style="font-weight:bold">Not Found</span>
                    </template>
                    <div  style="    background: #25D366;height: 8px;width: 8px;border-radius: 50%;display: inline-block;margin: 0 3px;"></div>
                    --
                </vs-tooltip>


            </vs-td>
            <vs-td>
                <vs-tooltip color="#2C4484">
                    <template #tooltip>
                        <span style="font-weight:bold">target: {{ ((tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved)).toFixed(2) }} %</span>
                    </template>
                    <div class="target">
                        <div v-if="(tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved) <= 30"
                        :style="{
                         'width':(tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved)+'%',
                         'background': '#dc3545'
                         }"></div>
                        <div v-else-if="(tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved) > 30 && (tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved) <= 70" 
                        :style="{
                          'width':(tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved)+'%',
                          'background-color': '#ffc107'
                          }"></div>
                        <div v-else 
                        :style="{'width':(tr.Obligation.TotalRecieved * 100 ) / (tr.Obligation.Obligation + tr.Obligation.TotalRecieved) +'%',
                        'background-color': '#28a745'}"></div>
                    </div>
                </vs-tooltip>
                
            </vs-td>
            <vs-td v-if="tr.dateObligation.length > 0 && tr.dateObligation.find(ele => ele.status == 'upcoming')">
                {{new Date(tr.dateObligation.find(ele => ele.status == 'upcoming').date).toLocaleDateString()}}
            </vs-td>
            <vs-td v-else>
                --
            </vs-td>
            <vs-td style="actions">
            <vs-button
              color="whatsapp"
              circle
              icon
              floating
              @click="$router.push(`payments/${tr.memb[0].id}`)"
            >
               <img style="width:15px" src="@/assets/dollar-symbol.svg" alt="">
            </vs-button>

            <vs-button
              color="#ff3e4e"
              circle
              icon
              floating
              @click="handleDeleteMembership(tr)"
              v-if="isAdmin()"
            >
              <img style="width:15px" src="@/assets/delete.svg" alt="">
            </vs-button>


            <vs-button
              color="#333"
              circle
              icon
              floating
              @click="$router.push(`/payment-history/${tr.user.id}`)"
            >
              <img style="width:15px" src="@/assets/debt.svg" alt="">
            </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer v-if="totalPages > 1">
          <vs-pagination v-model="page" :length="totalPages" />
        </template>
      </vs-table>
  </div>


        <vs-dialog color="danger" width="550px" not-center v-model="showDeleteConfirm">
        <template #header>
          <h4 class="not-margin">
            Delete Membership 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete This Membership
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeMemb" transparent>
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

import axiosApi from '@/plugins/axios.js';

export default {
      data:() => ({
       page:1,
       totalPages: 1,
       payments:[],
      showDeleteConfirm: false,
      currMemb:{},
      }),
      created(){
        this.getMembs();
      },
      watch:{
        page(val){
          this.getMembs(val);
        }
      },
      methods:{
        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        handleDeleteMembership(memb){
          this.currMemb = {...memb}
          this.showDeleteConfirm = true;
        },
        removeMemb(){
          const loading = this.$vs.loading();
          this.showDeleteConfirm = false;
          axiosApi.post(`/deleteMembership`, {membershipId: this.currMemb.id}).then(() => {
            this.$vs.notification({
                title:"Success !",
                text:`Membership Deleted Successfully`,
                color:"success",
                position:"top-center"
            });
            this.getMembs();
          }).finally(() => loading.close())
        },
        getMembs(val = 1){
          let loading = this.$vs.loading();
          axiosApi.get(`/getMemps?page=${val}`).then(res => {
            this.payments = res.data.docs;
            this.page = res.data.page;
            this.totalPages = res.data.totalPages;
          }).finally(() => loading.close())
        },
      }
    }
</script>

<style lang="scss">
.payments{
  padding: 15px 23px;
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
   .target{
        width: 71px;
    height: 20px;
    position: relative;
    background: #f5f5f5;
    border-radius: 5px;
    overflow: hidden;
        >div{
            position: absolute;
            top:0;
            left:0;
            width:50%;
            height:100%;
        }
    }
  .payments-head{
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