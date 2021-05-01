<template>
  <div id="app">
    <div :class="{'page-container':true, 'isLogin': this.$router.currentRoute.path == '/login'}" :style="{
      'padding': this.$router.currentRoute.path != '/login' ? '24px 15px 17px 9px' : '',
      'margin-left': this.$router.currentRoute.path != '/login' ? '220px': ''
      }">
       <Sidebar v-if="this.$router.currentRoute.path != '/login' "/>
      <div class="inner-page-container" :style="{
        'border-radius': this.$router.currentRoute.path != '/login' ? '40px 12px 22px 12px' : '',
        'min-height':'95vh'
      }">
        <Navbar v-if="this.$router.currentRoute.path != '/login' "/>
        <router-view/>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Navbar
  },
  mounted(){
    console.log()
  }
}
</script>

<style lang="scss">
*{
  padding:0;
  margin:0;
  scroll-behavior: smooth;
}

.payments .vs-table__th__content {
    display: block !important;
}
.page-container.reduced{
  margin-left: 43px !important;
}
.page-container{
  transition: all 0.25s ease;
    background: #2c4484 !important;
    margin-left: 220px !important;
    
  .inner-page-container{
    background: #FFF !important;
    // padding: 25px;
    
    
  }
}
.page-container.isLogin{
  margin-left: 0 !important;
}
@media (max-width: 575.98px){
  .page-container{
    margin-left:43px !important;
  }
  .page-container.isLogin{
  margin-left: 0 !important;
}
}
@media (min-width: 576px) and (max-width: 767.98px){
  .page-container{
    margin-left:43px !important;
  }
  .page-container.isLogin{
  margin-left: 0 !important;
}
}
@media (min-width: 768px) and (max-width: 991.98px){
  .page-container{
    margin-left:43px !important;
  }
  .page-container.isLogin{
  margin-left: 0 !important;
}
}
</style>
