<template>
  <div class="payments-and-add-one">


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
            Pay New Obligation
        </vs-button>
      </div>
    </b-modal>

      <div class="container">
          <div class="history-obligation" style="display:flex;flex-wrap:wrap">
          <div style="flex:1">
            <StarHeader style="margin-top:15px" title="Payments History" />
          </div>
          <div style="margin-top:18px">
            <vs-button @click="$bvModal.show('modal-preven-payNew'), newFatora = {}">Pay New Obligation</vs-button>
          </div>
        </div>
         

          <div class="payment-container" v-for="payment in payments.memb[0].payment" :key="payment.id">
              <div style="display:flex;flex-wrap:wrap">
                  <div style="flex:1">
                      <h6><img style="width:20px" src="@/assets/calendar.svg" alt=""> {{new Date(payment.date).toLocaleString()}} </h6>
                  </div>
                  <div>
                      <h6><img style="width:20px" src="@/assets/money-bag-with-dollar-symbol.svg" alt=""> {{payment.amount}} </h6>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'
import StarHeader from '@/components/StarHeader.vue'
export default {
    created(){
        this.getPayementsMemb();
    },
    components:{
        StarHeader
    },
    data(){
        return{
            payments: [],
            newFatora: {}
        }
    },
    methods:{
        getPayementsMemb(){
            let loading = this.$vs.loading();
            axiosApi.get(`/getPayementsMemb?id=${this.$route.params.id}`).then(res => {
                this.payments = res.data;
            }).finally(() => loading.close());
        },

        payNewFatora(){
          this.$bvModal.hide('modal-preven-payNew');
            const loading = this.$vs.loading();
            console.log(this.user)
            this.membId = this.$route.params.id;
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
                this.getPayementsMemb();
            }).finally(() => loading.close());
        },

    }
}
</script>

<style lang="scss">
.payments-and-add-one{

    .payment-container{
        >div{
            padding: 25px;
            border-bottom: 1px solid #DDD;
            h6{
                margin-bottom: 0;
            }
            
        }
    }
    
}

</style>