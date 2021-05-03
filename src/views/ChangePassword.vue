<template>
  <div style="overflow:hidden">
      <div class="container">
          <StarHeader title="Update Password" />

          <div>
              <div class="form-group">
                   <vs-input style="width: 100%;" type="password" v-model="forgetPassword" placeholder="Password">
                        <template #icon>
                        <img style="width:20px" src="@/assets/edit-icons/id-card.svg" alt="">
                        </template>
                    </vs-input>
              </div>

              <vs-button @click="updatePass">Update</vs-button>
          </div>
      </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'
import StarHeader from "@/components/StarHeader.vue";

export default {
    components:{
        StarHeader
    },
    data(){
        return {
            forgetPassword:""
        }
    },
    methods:{
        updatePass(){
            const loading = this.$vs.loading();
            let adminId = JSON.parse(localStorage.getItem("OxfitGymUser")).id;
            axiosApi.post(`/changePassword?id=${adminId}`, {password: this.forgetPassword}).then(() => {
                this.$vs.notification({
                    title:"Success !",
                    text:`Password Updated Successfully`,
                    color:"success",
                    position:"top-center"
                });
                this.forgetPassword = "";
            }).finally(() => loading.close())
        },
    }
}
</script>

<style style="scss">

</style>