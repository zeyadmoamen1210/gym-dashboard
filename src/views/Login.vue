<template>
  <div class="login-page">
    <div class="form">
      <div class="logo">
        <img src="@/assets/main-logo.png" alt="" />
      </div>
      <h5>Log in</h5>
      <p>To Your Online Account</p>

      <div class="container">
        <div class="col-md-8" style="margin:auto">
          <div class="row">
            <div class="col-md-8" style="margin:auto">
              <div class="form-group">
                <vs-input
                  v-model="form.email"
                  placeholder="Email"
                >
                  <template #icon>
                    <img
                      style="width:20px"
                      src="@/assets/edit-icons/user.svg"
                      alt=""
                    />
                  </template>
                </vs-input>
              </div>
            </div>

            <div class="col-md-8" style="margin:auto">
              <div class="form-group">
                <vs-input
                type="password"
                  v-model="form.password"
                  placeholder="Password"
                >
                  <template #icon>
                    <img
                      style="width:20px"
                      src="@/assets/edit-icons/id-card.svg"
                      alt=""
                    />
                  </template>
                </vs-input>
              </div>
            </div>


            
             <div class="col-md-8" style="margin:auto">
                <vs-button
                style="width:100%"
                :active="active == 1"
                @click="makeLogin"
            >
                Login
            </vs-button>
            </div>


          </div>

         

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'

export default {
  name:"Login",
  data() {
    return {
      form: {},
      active:""
    };
  },
  beforeRouteEnter(to, from, next){
    if (localStorage.getItem('oxfitGymToken')){
      next({name: "Home"})
    }else{
      next();
    }
  },
  methods:{
    makeLogin(){
      const loading = this.$vs.loading();
      axiosApi.post('/login-admin', this.form).then(res => {
        console.log(res);
        this.$store.commit('setUser', res.data.user)
        window.localStorage.setItem("OxfitGymUser", JSON.stringify(res.data.user));
        window.localStorage.setItem('oxfitGymToken', res.data.token);
        this.$vs.notification({
            title:"Welcome Back !",
            text:`We Hope You Are Happy (✿◠‿◠)`,
            color:"success",
            position:"top-center"
        });
        this.$router.push('/');
        location.reload();
      }).catch((error) => {
        if(error.response.status === 401){
          this.$vs.notification({
            title:"Failed !",
            text:"There Are Something Wrong In Your Email Or Password",
            color:"danger",
            position:"top-center"
          });
        }else{
          this.$vs.notification({
            title:"No Internet !",
            text:"Check Connection To Internet",
            color:"danger",
            position:"top-center"
          });
        }

        

      }).finally(() => loading.close());
    }
  }
};
</script>

<style lang="scss">
.login-page {
  background-image: url("../assets/login-bg.png");
  min-height: 100vh;
  background-size: cover;
  background-position: 71% 11%;
  background-repeat: no-repeat;
  border: 10px solid #2c4484;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: " ";
    background: linear-gradient(-358deg, transparent, #2c4484d1);
  }
  .form {
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 999;
    .logo {
      img {
        width: 130px;
      }
    }
    h5 {
      font-size: 50px;
      font-weight: bold;
    }
    .vs-input.vs-input--has-icon {
      background: #fff !important;
      color: #333 !important;
    width: 100%;
    }
    .vs-input--has-icon ~ .vs-input__label {
        color: #333;
    }

    .vs-button--default {
        background: linear-gradient(-1deg, #08132f8c, #0036c58c) !important;
        color: #FFF !important;
        padding: 0px;
        font-size: 17px;
    }

  }
}
</style>
