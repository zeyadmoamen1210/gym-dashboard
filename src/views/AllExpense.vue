<template>
  <div class="container">


        <b-modal
      id="modal-add-expense"
      ref="modal"
      title="Submit Your Name"
      hide-header
      hide-footer
      class="add-memb"
    >
      <div>
        <div class="row">
            <div class="col-md-12">
                <div class="center content-inputs">
                    <label for=""> Title: </label>
                    <vs-input style="width:100%" v-model="addExpense.title" placeholder="Title" />
                </div>
            </div>

            <div class="col-md-12">
                <div class="center content-inputs">
                    <label for=""> Price: </label>
                    <vs-input type="number" style="margin-right:5px" v-model="addExpense.price" placeholder="Duration" />
                </div>
            </div>

            <div class="col-md-12">
                <div class="center content-inputs">
                    <label for=""> Description: </label>
                    <textarea class="form-control select-time" style="margin-right:5px;height: 118px;" v-model="addExpense.description" placeholder="Duration" ></textarea>
                </div>
            </div>


          


        </div>

         <vs-button @click="addNewExpense()">
                Add Offer
        </vs-button>


        </div>
        </b-modal>


      <div>
          <div style="display:flex;margin:15px 0">
              <div style="flex:1">
                  <StarHeader title="All Expenses" />
              </div>
              <div style="padding:5px 0">
                  <vs-button @click="$bvModal.show('modal-add-expense')">
                      +
                  </vs-button>
              </div>
          </div>

          <div class="row">
              
              <div style="margin-bottom:25px;" v-for="expense in allExpenses" :key="expense.id" class="col-md-6">
                  <div style="padding: 15px;background: #f7f7f7;border-left: 3px solid #2c4484;">
                        <h6 style="text-transform:capitalize"> <span style="font-weight: 400;color: #2c4484;">Title: </span> {{expense.title}} </h6>
                        <h6 style="text-transform:capitalize"> <span style="font-weight: 400;color: #2c4484;">Description: </span> {{expense.description}} </h6>
                        <h6 style="text-transform:capitalize"> <span style="font-weight: 400;color: #2c4484;">Price: </span> {{expense.price}} </h6>
                  </div>
              </div>
          </div>


          <div v-if="totalPages > 1" class="pagination-container" style="padding-bottom: 34px;">
                    <div class="center con-pagination">
                        <vs-pagination progress v-model="page" :length="totalPages" />
                    </div>
            </div>
      </div>

  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader';
import axiosApi from '@/plugins/axios.js';

export default {
    components:{
        StarHeader
    },
    data(){
        return{
            page: 1,
            totalPages: 1,
            allExpenses: [],
            addExpense: {}
        }
    },
    created(){
        this.getAllExpense();
    },
    watch:{
        page(val){
            this.getAllExpense(val);
        }
    },
    methods:{
        addNewExpense(){
            const loading = this.$vs.loading();
            this.$bvModal.hide('modal-add-expense');
            axiosApi.post(`/addExpense`, {
                title: this.addExpense.title,
                price: this.addExpense.price,
                description: this.addExpense.description,
            }).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Expenses Added To Successfully`,
                    color:"success",
                    position:"top-center"
                });
                this.getAllExpense();
            }).finally(() => loading.close());
        },
        getAllExpense(page = 1){
            const loading = this.$vs.loading();
            axiosApi.get(`/getExpenses?page=${page}`).then(res => {
                this.allExpenses = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    }
}
</script>

<style lang="scss">
#modal-add-expense{
    .select-time{
        border: 2px solid transparent;
    background: rgba(var(--vs-gray-2), 1) !important;
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
  .vs-input{
      width: 100%;
  }
}

</style>