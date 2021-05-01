<template>
  <div>
      <div class="main-navbar">
          <div class="container">
              <div class="row">
                  <div class="col-md-4">
                      <!-- <div>
                            <input placeholder="Search For ..." type="text" class="form-control gym-search">
                      </div> -->
                  </div>

                  <div class="col-md-8 text-right">
                      
                    <div>
                        <vs-button @click="logout()" color="#FFF" style="display:inline-block;margin:0;padding:0">
                            <img src="@/assets/sign-out-option.svg" style="width:25px;" alt="">
                        </vs-button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        logout(){
            localStorage.removeItem("oxfitGymToken");
            this.$store.commit('Logout');
            this.$router.push(`/login`)
        }
    }
}
</script>

<style lang="scss">
.main-navbar{
    background: #FFF !important;
    padding: 19px 15px;
    border-radius: 40px 33px 0 0;
    box-shadow: 0 4px 25px 0 #0000001a;
    .gym-search{
        border-radius: 15px;
        box-shadow: -1px 1px 9px 0 #0000001a;
        border: 1px solid #2c448412;
    }
}
</style>