<template>
  <div class="offers-page">

        <b-modal
      id="modal-add-offer"
      ref="modal"
      title="Submit Your Name"
      hide-header
      hide-footer
      class="add-memb"
    >
      <div>
        <div class="row">
            <div class="col-md-6">
                <div class="center content-inputs">
                    <label for=""> Title: </label>
                    <vs-input style="width:100%" v-model="addOffer.title" placeholder="Title" />
                </div>
            </div>

            <div class="col-md-6">
                <div class="center content-inputs">
                    <label for=""> Duration: </label>
                    <vs-input type="number" style="margin-right:5px" v-model="addOffer.duration" placeholder="Duration" />
                </div>
            </div>

            <div class="col-md-6">
                 <div>
                    <label for=""> Type: </label>
                        <v-select
                        class="select-time"
                        v-model="addOffer.time"
                        :options="['Days', 'Minutes']"
                        style="background: rgba(var(--vs-gray-2), 1) !important"
                        />
                </div>
            </div>

            <div class="col-md-6">
                <div class="center content-inputs">
                    <label for=""> Price: </label>
                    <vs-input style="width:100%" v-model="addOffer.price" placeholder="Price" />
                </div>
            </div>

            <div class="col-md-6">
                <div class="center content-inputs">
                    <label for=""> Sesstion: </label>
                    <vs-input style="width:100%" v-model="addOffer.sessions" placeholder="Number OF Sesstions" />        
                </div>
            </div>

            <div class="col-md-6">
                 <div class="center content-inputs">
                    <label for=""> Frees: </label>
                    <vs-input style="width:100%" v-model="addOffer.frees" type="number" placeholder="Frees" />
                </div>
            </div>


            <div class="col-md-12" style="margin-bottom: 18px">
                <div class="file-choose">
                <input
                    @change="file_selected"
                    type="file"
                />
                <span v-if="url">
                    <img :src="url" width="300" height="150" />
                </span>
                <span v-else>
                    <img src="@/assets/noun_Camera_1903011.png" /> Attach An Image
                </span>
                </div>
            </div>


        </div>

         <vs-button @click="addNewOffer()">
                Add Offer
        </vs-button>


        </div>
        </b-modal>



      <div class="container">
          <div>
              <div class="offers-head">
                    <div style="display:flex;flex:1">
                        <div class="logo">
                            <img style="width: 30px;margin-right: 8px;margin-top: 3px;" src="@/assets/black-shop-tag.svg" alt="">
                        </div>
                        <div>
                            <h4 class="head">Offers</h4>
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
                        <div  v-if="isAdmin()" style="flex:1">
                            <vs-button @click="handleAddOffer">
                                +
                            </vs-button>
                        </div>
                    </div>
                </div>

                <NoData v-if="offers.length == 0" />
                <div class="row" v-else>
                    <div class="col-md-4" v-for="offer in offers" :key="offer.id">
                        <offerCard :offer="offer">
                            <template slot="delete">
                                <div style="    width: 46px;" >
                                        <button style="padding: 10px;margin: 0;" class="btn " @click="deleteOffer(offer)">
                                            <img style="width:100%" src="@/assets/trash.svg" alt="">
                                        </button>
                                </div>
                            </template>
                        </offerCard>
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
            Delete Offer 
          </h4>
        </template>


        <div class="con-content">
          <p>
            Are You Sure You Want To Delete <span style="display:block;font-size: 16px;color: var(--danger);text-transform: capitalize;"> {{offer.title}} </span> This Offer
          </p>
        </div>

        <template #footer>
          <div class="con-footer" style="display:flex">
            <vs-button color="danger" @click="removeOffer" transparent>
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
import offerCard from '@/components/offerCard'
import NoData from '@/components/NoData'
import axiosApi from '@/plugins/axios.js'

export default {
    components:{
        offerCard,
        NoData
    },
    data(){
        return {
            offers:[],
            page:1,
            totalPages: 1,
            addOffer: {},
            photo:"",
            url:"",
            offer:{},
            showDeleteConfirm: false,
        }
    },
    watch:{
        page(val){
            this.getOffers(val);
        }
    },
    methods:{

        deleteOffer(offer){
            this.offer = {...offer}
            this.showDeleteConfirm = true;
        },
        removeOffer(){
            const loading = this.$vs.loading();
            this.showDeleteConfirm = false;
            axiosApi.post(`/deleteOffer`, {offerId: this.offer.id}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Offer Deleted Successfully`,
                    color:"success",
                    position:"top-center"
                });

                this.getOffers();
            }).catch(() => {
                this.$vs.notification({
                    title:"Failed !",
                    text:`There Are Something Wrong`,
                    color:"danger",
                    position:"top-center"
                });
            }).finally(() => loading.close());
        },

        isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
        addNewOffer(){
            const loading = this.$vs.loading();

            if(this.addOffer.time == 'Days'){
                this.addOffer.duration += 'D'
            }else if (this.addOffer.time == 'Houres'){
                this.addOffer.duration += 'H'
            }else if (this.addOffer.time =='Minutes'){
                this.addOffer.duration += 'M'
            }

            this.$bvModal.hide('modal-add-offer')

            let formData = new FormData();

            formData.append("title", this.addOffer.title);
            formData.append("price", this.addOffer.price);
            formData.append("duration", this.addOffer.duration);
            formData.append("sessions", this.addOffer.sessions);
            formData.append("frees", this.addOffer.frees);
            if(this.photo){
                formData.append("photo", this.photo);
            }

            axiosApi.post(`/addOffer`, formData).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Membership Added Successfully`,
                    color:"success",
                    position:"top-center"
                });
                this.getOffers();
            }).finally(() => loading.close());
        },
        handleAddOffer(){
            this.$bvModal.show('modal-add-offer')
            // this.addOfferPopup = true;
        },
        getOffers(page = 1){
            const loading = this.$vs.loading();
            axiosApi.get(`/getOffers?page=${page}`).then(res => {
                this.offers = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        },
        file_selected(e) {
            if (e.target.files.length > 0) {
                this.url = null;
                this.photo = e.target.files[0];

                this.url = URL.createObjectURL(this.photo);
            }
        },
    },
    created(){
        this.getOffers();
    },
}
</script>

<style lang="scss">
.offers-page{
    padding: 15px 23px;
    .offers-head{
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
          color: #f85b1c;
        font-weight: bold;
        margin-bottom: 0;
        font-size: 26px;
      
    }

  }

 
    
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
        border: none !important;
    }
    padding:0;
    .vs__dropdown-toggle{
        border: none !important
    }
    }
.file-choose {
    position: relative;
    width: 100%;
    height: 200px;
    margin-top: 13px;
    z-index: 99;
    input[type="file"] {
      position: absolute;
      width: 100%;
      /* visibility: hidden; */
      opacity: 0;
      height: 100%;
      cursor: pointer;
      margin-top: 10px;
    }
    span {
      border: 1px dashed #444444;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      background: #fff;
      z-index: -1;
      margin: 10px 0;
      height: 100%;
      text-align: center;
      cursor: pointer;
      border-radius: 15px;
      line-height: 186px;
      color: #444444;
    }
  }
</style>