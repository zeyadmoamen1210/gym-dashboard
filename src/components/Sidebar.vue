<template>
  <div class="hidden main-sidebar">
      <vs-sidebar
        v-model="active"
        open
        :reduce="reduce"
        background="#2C4484"
        textWhite
        >
        <template #logo>
          <!-- ...img logo -->
          <img src="@/assets/main-logo.png" alt="">
        </template>
          <h6 style="    text-align: center;margin: auto;">FIT HOUSE GYM</h6>
        <vs-sidebar-item id="Collapse" @click.native="reduceSidebar">
          <template #icon>
            <!-- <i class='bx bx-home'></i> -->
            <img class="icon-nav" src="@/assets/icons8-menu.svg"  alt="">
          </template>
          Collapse
        </vs-sidebar-item>
        <vs-sidebar-item id="home" to="/">
          <template #icon>
            <!-- <i class='bx bx-home'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">
          </template>
          Dashboard
        </vs-sidebar-item>
        
        

        <!-- Start Of Group -->

        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <!-- <i class='bx bx-group'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/whistle.svg" alt="">

              </template>
              Trainer
            </vs-sidebar-item>
          </template>

          
          <vs-sidebar-item v-if="isAdmin()" id="AddTrainer" to="/add-trainer">
            <template #icon>
              <!-- <i class='bx bxl-facebook' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            Add
          </vs-sidebar-item>

          <vs-sidebar-item id="ShowTrainer" to="/trainers">
            <template #icon>
              <!-- <i class='bx bxl-facebook' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            All
          </vs-sidebar-item>
        </vs-sidebar-group>


        <!-- End Of Group -->

        <!-- Start Of Group -->

        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <!-- <i class='bx bx-group'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/receptionist.svg" alt="">

              </template>
              Receptionist
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item v-if="isAdmin()" id="addReciptianist" to="/add-reciptianist">
            <template #icon>
              <!-- <i class='bx bxl-instagram'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            Add
          </vs-sidebar-item>
          <vs-sidebar-item id="reciptianist" to="/reciptianist">
            <template #icon>
              <!-- <i class='bx bxl-instagram'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            All
          </vs-sidebar-item>
          
          
         
        </vs-sidebar-group>


        <!-- End Of Group -->





        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <!-- <i class='bx bx-group'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/receptionist.svg" alt="">

              </template>
              Sales
            </vs-sidebar-item>
          </template>

          <vs-sidebar-item v-if="isAdmin()" id="addSales" to="/add-sales">
            <template #icon>
              <!-- <i class='bx bxl-instagram'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            Add
          </vs-sidebar-item>
          <vs-sidebar-item id="sales" to="/sales">
            <template #icon>
              <!-- <i class='bx bxl-instagram'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            All
          </vs-sidebar-item>
          
          
         
        </vs-sidebar-group>



        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <!-- <i class='bx bx-code-alt' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/group.svg" alt="">

              </template>
              Participant
            </vs-sidebar-item>
          </template>

        
          <vs-sidebar-item id="Javascript"  to="/participant">
            <template #icon>
              <!-- <i class='bx bxl-javascript' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            All Participant
          </vs-sidebar-item>

          <vs-sidebar-item id="trainees"  to="/trainees">
            <template #icon>
              <!-- <i class='bx bxl-javascript' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            All Trinees
          </vs-sidebar-item>

          <vs-sidebar-item v-if="isAdmin()" id="add-participant"  to="/add-participant">
            <template #icon>
              <!-- <i class='bx bxl-javascript' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/dashboard.svg" alt="">

            </template>
            add
          </vs-sidebar-item>

          
         
          
        </vs-sidebar-group>
        <vs-sidebar-item id="memberships" to="/memberships">
          <template #icon>
            <!-- <i class='bx bxs-donate-heart' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/membership.svg" alt="">

          </template>
          Membership
        </vs-sidebar-item>
       
        <vs-sidebar-item v-if="isAdmin()" id="shopping" to="/schedule">
          <template #icon>
            <!-- <i class='bx bxs-shopping-bags'></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/schedule.svg" alt="">

          </template>
          Schedual
        </vs-sidebar-item>
        <vs-sidebar-item id="chat" to="/payments">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/income.svg" alt="">

          </template>
          Payment
        </vs-sidebar-item>


        
         <vs-sidebar-item id="alert" to="/alerts">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/warning.svg" alt="">

          </template>
          Alert
        </vs-sidebar-item>


        <vs-sidebar-item id="RecentHistory" to="/expenses">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/expenses.svg" alt="">

          </template>
          Expenses
        </vs-sidebar-item>

        <vs-sidebar-item id="Offers" to="/offers">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/offer.svg" alt="">

          </template>
          Offers
        </vs-sidebar-item>


        <vs-sidebar-item id="Complaints" to="/complaint">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/evaluate.svg" alt="">

          </template>
          Complaints
        </vs-sidebar-item>


        
        
        

       



        <vs-sidebar-item id="print" to="/printsheets">
          <template #icon>
            <!-- <i class='bx bx-chat' ></i> -->
            <img class="icon-nav" src="@/assets/navbar-icons/printing.svg" alt="">

          </template>
          Print Sheet
        </vs-sidebar-item>



       


        
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img v-if="me && me.photo" :src="me.photo" alt="">
              <img v-else src="@/assets/personal.jpg" alt="">
            </vs-avatar>

            <vs-avatar style="cursor:pointer" @click="$router.push(`/alerts`)">
              <img style="width:35px" src="@/assets/navbar-icons/alarm.svg" alt="">
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
    </div>
</template>

<script>
export default {
  data:() => ({
        active: 'home',
        reduce: false,
        me:{}
  }),
   created(){
    this.me = JSON.parse(localStorage.getItem('OxfitGymUser'));
    
  },
  methods:{
    isAdmin(){
          return (JSON.parse(localStorage.getItem('OxfitGymUser')).role == 'admin')
        },
    reduceSidebar(){
      this.reduce = !this.reduce;
      if(this.reduce){
        document.querySelector(".page-container").classList.add("reduced")
      }else{
        document.querySelector(".page-container").classList.remove("reduced")
      }
    }
  }
}
</script>

<style lang="scss">
/************* Start Of Override Vuesax Classes ****************/
.main-sidebar{
  .vs-sidebar-content .vs-sidebar__logo img {
    max-width: 230px !important;
    max-height: 97px !important;
  }

  .vs-sidebar-content{
    border-radius: 0;
  }

  .vs-sidebar-content{
    max-width:220px !important;
    z-index: 800 !important;
  }

  .vs-sidebar__item__arrow{
    margin-right:50px !important;
  }
}



/*************** End Of Override Vuesax Classes ****************/
.main-sidebar{
  .icon-nav{
    width: 50px;
    height: 23px;
  }
}
</style>