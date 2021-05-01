import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/vuesax.js'
import './plugins/bootstrap.js'
import './plugins/vue-apexcharts.js'
import './plugins/axios.js'
import './plugins/vue-select'
import './plugins/vue-datetime'
import './plugins/moment'
import './plugins/vee-validate'







Vue.config.productionTip = false

// Middleware Check if this user is LoggedIn Or Not If Not Redirect it to login page

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' 
  && !localStorage.getItem('oxfitGymToken') 
  && !localStorage.getItem("OxfitGymUser")) next({ name: 'Login' })
  else next()
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
