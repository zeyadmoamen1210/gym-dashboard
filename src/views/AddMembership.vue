<template>
  <div class="container">
      <div class="addmembership">
        <StarHeader style="margin-top:15px;margin-bottom:15px;" title="Add Membership" />


        <div class="membership-data" v-if="$route.query.type == 'membership' || $route.query.type == 'offer'">
          <div class="row">
            <div class="col-md-6">
              <h6>Membership: <span> {{$route.query.title}} </span> </h6>
            </div>
            <div class="col-md-6">
              <h6>duration: <span> {{$route.query.duration}} </span> </h6>
            </div>
            <div class="col-md-6">
              <h6>price: <span> {{$route.query.price}} </span> </h6>
            </div>
            <div class="col-md-6">
              <h6>sessions: <span> {{$route.query.sessions}} </span> </h6>
            </div>
             <div class="col-md-6">
              <h6>frees: <span> {{$route.query.frees}} </span> </h6>
            </div>
            <div class="col-md-6">
              <h6>Type: <span> {{$route.query.type}} </span> </h6>
            </div>
          </div>
          
          
          
          
          
        </div>

        <div class="row">
          <!-- <div class="col-md-6">
            <div class="form-group">
              <label for=""> Price: </label>
              <vs-input state="dark" type="text" v-model="addMembership.price" >
              </vs-input>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for=""> Frees: </label>
              <vs-input state="dark" type="text" v-model="addMembership.frees" >
              </vs-input>
            </div>
          </div> -->

          <!-- <div class="col-md-6">
            <div class="form-group">
              <label for=""> Sessions: </label>
              <vs-input state="dark" type="text" v-model="addMembership.sesstions" >
              </vs-input>
            </div>
          </div> -->





          <!-- <div class="col-md-6">
            <div style="display:flex">

                <div class="center content-inputs" style="flex:1">
                    <label for=""> Duration: </label>
                    <vs-input type="number" state="dark" style="margin-right:5px" v-model="addMembership.duration" />
                </div>

                <div style="flex:1">
                    <label for=""> Type: </label>

                    <v-select
                    class="select-time"
                    :options="['Days', 'Minutes']"
                    v-model="addMembership.time"
                    />

                </div>


            </div>
          </div> -->


          <div class="col-md-4">
            <div class="form-group">
              <label for=""> Amount: </label>
              <vs-input state="dark" type="text" v-model="addMembership.amount" >
              </vs-input>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for=""> Start Date: </label>
              <datetime style="width:100%" hidden-name="Strat Date" title="Start Date" input-class="select-time" v-model="addMembership.startDate" type="datetime"></datetime>
            </div>
          </div>

          <div class="col-md-4">
             <div class="form-group">
               <label for=""> User: </label>
                <v-select
                class="select-time"
                :options="allTrainee"
                label="username"
                :reduce="username => username.id"
                v-model="addMembership.user"
                />
              </div>
          </div>

          <div class="col-md-12" style="margin-bottom:25px;">
            <div>
              <vs-button @click="dateObligation.push({data:'', amout:''})">+ Add Obligation</vs-button>

              <div v-for="(oblig,index ) in dateObligation" :key="index">
                <div class="row">
                  <div class="col-md-6">
                     <div>
                       <label for=""> Obligation {{index+1}} Date: </label>
                      <datetime style="width:100%" :hidden-name="`Obligation ${index + 1} Amount`" :title="`Obligation ${index + 1} Amount`" input-class="select-time" v-model="oblig.date" type="datetime"></datetime>
                    </div>
                  </div>

                  <div class="col-md-5">
                    <div>
                      <label for=""> Obligation {{index+1}} Amount: </label>
                      <vs-input state="dark" type="text" v-model="oblig.amount" >
                      </vs-input>
                    </div>
                  </div>

                  <div class="col-md-1">
                    <div>
                      <label for="">  </label>
                      <vs-button color="danger" style="padding: 3px 5px;margin-top: 8px;" @click="dateObligation.splice(index , 1)">X</vs-button>
                    </div>
                  </div>
                </div>
               
                
              </div>
            </div>
          </div>

          


        </div>
      </div>

      <vs-button style="margin-bottom:25px;" @click="AddMembershipToUser()">
        Add Membership To This User
      </vs-button>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js';
import StarHeader from '@/components/StarHeader.vue';

export default {
  components:{
    StarHeader
  },
  data(){
    return{
      addMembership:{
        time:"Days"
      },
      allTrainee: [],
      dateObligation: [
        {
          date:"",
          amount:""
        }
      ]
    }
  },
  created(){
    this.getTraineeUsers();
  },
  methods:{
    AddMembershipToUser(){
     let sum = 0;
     this.dateObligation.forEach(ele => {
       sum += Number(ele.amount);
     })
     sum += Number(this.addMembership.amount);
     if(sum == Number(this.$route.query.price)){
        const loading  = this.$vs.loading()
      axiosApi.post(`/add-membership`, {
        "price": this.$route.query.price,
        "frees": this.$route.query.frees,
        "sessions":this.$route.query.sessions,
        "duration": this.$route.query.duration,
        "amount": this.addMembership.amount,
        "startDate": this.addMembership.startDate,
        "user": this.addMembership.user,
        "membershipType": this.$route.query.type == 'offer' ? 'offer' : 'subscription',
        "membership":  this.$route.query.id,
        "dateObligation": [...this.dateObligation]
      }).then(() => {
        this.$vs.notification({
            title:"Success !",
            text:`Membership Added To User Successfully`,
            color:"success",
            position:"top-center"
        });
        this.dateObligation = [{data:"", amount:""}];
        this.addMembership = {};
      }).catch(err => {
        if(err.response.data.message && err.response.status === 400){
          this.$vs.notification({
            title:"Failed !",
            text:err.response.data.message,
            color:"danger",
            position:"top-center"
        });
        }
      }).finally(() => loading.close());
     }else{
       console.log(sum);
       this.$vs.notification({title:"Gosh !", text:"Amount And Obligations Must Assign The Price", color:"danger", position:"top-center"});
     }
    },
    getTraineeUsers(){
      const loading  = this.$vs.loading()
      axiosApi.get(`/getUsers?role=trainee&paginate=false`).then(res => {
        this.allTrainee = res.data;
      }).finally(() => loading.close());
    }
  }
}
</script>

<style lang="scss">
.addmembership{
  .vs-input-parent--state-dark .vs-input{
    width: 100%;
  }

  .membership-data{
    padding: 8px;
    background: #f7f7f7;
    border-left: 4px solid #2c4484;
    h6{
          font-weight: 400;
          text-transform: capitalize;
    }
    span{
      color: #2c4484;
          font-weight: bold;
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
  }
.v-select.select-time.vs--single.vs--searchable{
  padding:0;
}
.vs--searchable .vs__dropdown-toggle {
    cursor: text;
    width: 100%;
    height: 100%;
    top: 0;
    padding: 0;
    margin: 0;
    border: none;
}
.vs__clear{
  display: none;
}
</style>