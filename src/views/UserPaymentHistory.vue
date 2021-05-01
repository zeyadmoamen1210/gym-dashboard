<template>
  <div class="recent-history">
    <div class="container">
      <div class="recent-history-head">
        <div class="history-obligation">
          <div>
            <h4 class="head">Obligations History</h4>
          </div>
          <!-- <div >
            <vs-button @click="$bvModal.show('modal-preven-payNew')">Pay New Obligation</vs-button>
          </div> -->
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
    <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th>
              User.
            </vs-th>
            <vs-th>
              Date
            </vs-th>
         
            <vs-th>
              Client ID
            </vs-th>
            <vs-th>
              Amount
            </vs-th>
            <vs-th>
              Status
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in obligations"
            :data="tr.id"
          >
             <vs-td style="display:flex">
              <vs-avatar history history-gradient>
                <img :src="tr.user[0].photo" alt="">
              </vs-avatar>
              <span style="    padding: 10px;">
                {{ tr.user[0].username }}
              </span>
            </vs-td>
            <vs-td>
             {{ new Date(tr.dateObligation.date).toLocaleDateString() }}
            </vs-td>
            <vs-td>
            {{ tr.user[0]._id }}
            </vs-td>
            <vs-td style="font-weight: 500;">
                <img style="width:20px" src="@/assets/money-bag-with-dollar-symbol.svg" alt="">
            {{ tr.dateObligation.amount }}
            </vs-td>
            <vs-td>
                <span class="status" style="background:#f9ca24" v-if="tr.dateObligation.status == 'upcoming'">
                    {{ tr.dateObligation.status }}
                </span>
                <span class="status" style="background:#6ab04c" v-if="tr.dateObligation.status == 'paid'">
                    {{ tr.dateObligation.status }}
                </span>
                <span class="status" style="background:#eb4d4b" v-if="tr.dateObligation.status == 'Draft'">
                    {{ tr.dateObligation.status }}
                </span>

            
            </vs-td>
            
           
            <vs-td style="actions">
            <vs-button
              color="whatsapp"
              circle
              icon
              style="margin:auto"
              @click="handlePayBil(tr, tr.dateObligation)"
              floating
              v-if="tr.dateObligation.status != 'paid'"
            >
              <img style="width:15px" src="@/assets/dollar-symbol.svg" alt="">
            </vs-button>
            <vs-button
              color="primary"
              circle
              icon
              floating
              style="margin:auto"
              @click="readyToPrint(tr)"
            >
              <img style="width:15px" src="@/assets/printer.svg" alt="">
            </vs-button>

            <vs-button
              color="#ff3e4e"
              circle
              icon
              style="margin:auto"
              floating
              @click="handleDeleteObligation(tr)"
              v-if="isAdmin()"
            >
              <img style="width:15px" src="@/assets/delete.svg" alt="">
            </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer v-if="totalPages > 1">
          <vs-pagination v-model="page" :length="totalPages" />
        </template>
      </vs-table>
  </div>



        <vs-dialog color="danger" width="550px" not-center v-model="showPayConfirm">
        <template #header>
          <h4 class="not-margin">
            Pay Obligation
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Pay This Obligations <br/> This Will Cost <span style="font-weight:bold"> {{ currObli.amount }} </span>  <img style="width:20px" src="@/assets/money-bag-with-dollar-symbol.svg" alt="">
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="primary" @click="payBil()" transparent>
              <img style="width:20px" src="@/assets/money-bag-with-dollar-symbol.svg" alt=""> Pay This Obligation
            </vs-button>
            <vs-button @click="showPayConfirm=false" dark transparent>
              Cancel
            </vs-button>
          </div>
        </template>
      </vs-dialog>




      
     <b-modal
      id="modal-preven-payNew"
      ref="modal"
      title="Submit Your Name"
      hide-header
      hide-footer
      class="add-memb"
    >
      <div>
       

        <div class="center content-inputs">
            <label for=""> Amount: </label>
            <vs-input style="width:100%" v-model="newFatora.amount" type="number" placeholder="Amount" />
        </div>


        <vs-button style="margin-top:15px;" @click="payNewFatora()">
            Pay Obligation
        </vs-button>
      </div>
    </b-modal>



    <vs-dialog color="danger" width="550px" not-center v-model="showdeleteObligConfirm">
        <template #header>
          <h4 class="not-margin">
            Delete Obligation 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete This Obligation
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeObligation" transparent>
              <img style="width: 20px;margin: 0 4px;" src="@/assets/trash.svg" alt=""> Ok
            </vs-button>
            <vs-button @click="showdeleteObligConfirm=false" dark transparent>
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
    data(){
        return {
            obligations:[],
            page:1,
            totalPages: 1,
            showPayConfirm: false,
            currObli:{},
            payNew:{},
            user: {},
            newFatora: {},
            membId:"",
            currObliToDelete:{},
            showdeleteObligConfirm: false,
        }
    },
    methods:{
      isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
      readyToPrint(invoice){
        localStorage.setItem("ReadyToPrint", JSON.stringify(invoice));
        if(localStorage.getItem('ReadyToPrint')){
          this.$router.push(`/print-invoice/${invoice._id}`)
        }
      },
        handlePayBil(fullOblig, oblig){
            this.showPayConfirm = true;
            this.user = fullOblig
            this.currObli = {...oblig}
        },
        handleDeleteObligation(oblig){
          this.currObliToDelete = {...oblig};
          this.showdeleteObligConfirm = true;
        },
        removeObligation(){
          this.showdeleteObligConfirm = false;
          const loading = this.$vs.loading();
          console.log(this.currObliToDelete);
          axiosApi.post(`/deleteObligation`, {
            obligationId: this.currObliToDelete.dateObligation._id
          }).then(() => {
            this.$vs.notification({
                title:"Success !",
                text:`Obligation Deleted Successfully`,
                color:"success",
                position:"top-center"
            });
            this.getPaymentHistory();
          }).finally(() => loading.close())

        },
        payBil(){
            this.showPayConfirm = false;
            const loading = this.$vs.loading();
            axiosApi.post(`/payBill`, {memberId: this.user.memb[0]._id, obligionId: this.currObli._id , amount: this.currObli.amount}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Obligation Paid Successfully`,
                    color:"success",
                    position:"top-center"
                });
                this.getPaymentHistory();
            }).finally(() => loading.close());
        },
        payNewFatora(){
          this.$bvModal.hide('modal-preven-payNew');
            const loading = this.$vs.loading();
            console.log(this.user)
            this.membId = this.obligations[0].memb[0]._id;
            axiosApi.post(`/payBill`, {
              memberId: this.membId,
              amount: this.newFatora.amount
            }).then(() => {
              console.log("hello")
                this.$vs.notification({
                    title:"Success !",
                    text:`Obligation Paid Successfully`,
                    color:"success",
                    position:"top-center"
                });
                this.getPaymentHistory();
            }).finally(() => loading.close());
        },
        getPaymentHistory(val = 1){
            const loading = this.$vs.loading();
            axiosApi.get(`getBills?id=${this.$route.params.id}&page=${val}`).then(res => {
                this.obligations = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        },
        
    },
    watch:{
        page(val){
            this.getPaymentHistory(val);
        }
    },
    created(){
        this.getPaymentHistory();
        
    },
}
</script>

<style lang="scss">
.recent-history{
  padding: 15px 23px;

  .history-obligation{
    display: flex;
    flex-wrap: wrap;
  }
  .vs-table__td:last-child{
      display: flex !important;
      button{
        margin: 0 3px;
      }
    }
    .status{
        padding: 3px 8px;
        color: #FFF;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 13px;
    text-transform: uppercase;
    min-width: 98px;
    display: block;
    }
    .vs-table__td{
      text-align: center !important;
    }
    .vs-table__th__content{
        display: block !important;
    }
    
    .vs-table__th__content{
     font-weight: 600 !important;
     text-align: center;
   }
  .recent-history-head{
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