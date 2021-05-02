import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from "../router";

const axiosApi = axios.create({
    baseURL: `https://oxfitgym1.herokuapp.com/api/v1`,
    headers: {
         Authorization: `Bearer ${localStorage.getItem('oxfitGymToken')}` 
    }
})

// Set the AUTH token for any request
axiosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem('oxfitGymToken');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});



axiosApi.interceptors.response.use((response) => {
    
    return response;
  }, (error) => {
    // do what you want to do when error happens
    if (error.response.status === 401) {
      localStorage.removeItem("oxfitGymToken");
      localStorage.removeItem("OxfitGymUser");
      console.log("4000000001")
      router.push(`/login`)
    }

  
    // should reject the promise so your api call goes to catch block
    return Promise.reject(error);
  });

Vue.use(VueAxios, axios)
export default axiosApi;
