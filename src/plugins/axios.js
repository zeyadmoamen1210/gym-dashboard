import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const axiosApi = axios.create({
    baseURL: `https://oxfitgym1.herokuapp.com/api/v1`,
    headers: {
         Authorization: `Bearer ${localStorage.getItem('oxfitGymToken')}` 
    }
})

Vue.use(VueAxios, axios)
export default axiosApi;
