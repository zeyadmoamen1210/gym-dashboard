<template>
  <div class="all-alerts">
      <div class="">
          <div class="container">
              <div class="alert-header">

            <div style="flex:1">
                <StarHeader title="Alerts" />
            </div>

           <div class="search">
                <div class="form-group">
                    <v-select
                    class="select-time"
                    v-model="filterdAlerts"
                    label="text"
                    @input="filterdAlertsChanged()"
                    :reduce="text => text.value"
                    :options="filterOptions"
                    style="background:rgba(var(--vs-dark), 0.1) !important;min-width:196px;"
                    />
                    
                </div>
            </div>


          </div>
          </div>


          <div class="container">
              <div class="alert-content">
              <!-- <div class="alert-date">
                  <ul>
                      <li> Oct
                          <span :style="{'border':'2px solid #e67e22'}" class="after"></span>
                          
                      </li>
                      <li> Oct
                          <span :style="{'border':'2px solid #8e44ad'}" class="after"></span>
                      </li>
                      <li> Oct
                          <span :style="{'border':'2px solid #f1c40f'}" class="after"></span>
                      </li>
                      <li> Oct
                          <span :style="{'border':'2px solid #1abc9c'}" class="after"></span>
                      </li>
                      <li> Oct
                          <span :style="{'border':'2px solid #fd79a8'}" class="after"></span>
                      </li>
                      <li> Oct
                          <span :style="{'border':'2px solid #e17055'}" class="after"></span>
                      </li>
                  </ul>
              </div> -->
              <NoData v-if="alerts.length == 0" />
              <div v-else>
                <div style="display:flex" v-for="alert in alerts" :key="alert.id">
                    <span :style="{'background': getRandomColor()}"></span>
            
                    <h6 style="display:inline-block"> {{alert.status}} </h6>
                    
                    <!-- <img style="width:20px;    opacity: .5;" src="@/assets/dollar.svg" alt=""> -->
                    <h6 style="display:inline-block;    text-align: right;"> {{ $moment(alert.date).fromNow() }} </h6>
                </div>
              </div>
          </div>
          </div>


          <div v-if="totalPages > 1" class="pagination-container" style="padding-bottom: 25px;">
                <div class="center con-pagination">
                    <vs-pagination progress v-model="page" :length="totalPages" />
                </div>
            </div>

      </div>
  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader';
import NoData from '@/components/NoData';
import axiosApi from '@/plugins/axios.js';

export default {
    components:{
        StarHeader,
        NoData
    },
    data(){
        return {
            active:"",
            search:"",
            alerts: [],
            totalPages: 1,
            page:1,
            borderColors: [
                "#eb4d4b",
                "#be2edd",
                "#4834d4",
                "#6ab04c",
                "#f9ca24",
                "#b71540",
                "#0a3d62"
            ],
            filterOptions:[
                {text:"Membership Expired", value:1},
                {text:"Trainers Attendance", value:2},
                {text:"Trainer Leaves", value:3},
                {text:"Add Sessions", value:4},
                {text:"User Attendance", value:5},
                
            ],
            filterdAlerts:"",
        }
    },
    created(){
        this.getAlerts();
    },
    watch:{
        page(val){
            this.getAlerts(this.filterdAlerts, val);
        }
    },
    methods:{
        filterdAlertsChanged(){
            this.getAlerts(this.filterdAlerts);
        },
        getRandomColor() {
            let randomIndex = Math.round(Math.random() * this.borderColors.length);
            console.log(randomIndex);
            return this.borderColors[randomIndex];
            
        },
        getAlerts(filterType = '', page = 1){
            const loading = this.$vs.loading();
            axiosApi.get(`/getAlerts?page=${page}${filterType ? '&type=' + filterType : ''}`).then(res => {
                this.alerts = res.data.docs;
                this.page = res.data.page;
                this.totalPages = res.data.totalPages;
            }).finally(() => loading.close());
        }
    }
}
</script>

<style lang="scss">
.all-alerts{
    .alert-header{
        padding-top:20px;
        display:flex;
        flex-wrap:wrap;
    }
    .alert-content{
        display: flex;
        padding-bottom: 30px;
        height: 500px;
        .alert-date{
            flex-basis: 171px;
            background: #f7f7f7;
            ul{
                list-style: none;
                li{
                    line-height: 5;
                    text-align: center;
                    position: relative;
                    font-family: sans-serif;
                    font-size: 15px;
                    color: #6d6d6d;
                    padding-top: 2px;
                    .after{
                        position: absolute;
                        top: 46%;
                        right: 32%;
                        content: '';
                        width: 10px;
                        height: 10px;
                        /* background: crimson; */
                        transform: translate(-50%,-0%);
                        border-radius: 50%;
                        border: 1px solid #ff1212;
                        z-index: 9;
                    }
                    &:not(:last-of-type){
                        &::after{
                            position: absolute;
                            top: 46%;
                            right: 38%;
                            z-index: 8;
                            content: '';
                            width: 2px;
                            height: 100%;
                            /* background: crimson; */
                            border-right: 1px solid #ddd;
                        }
                    }
                }
            }
        }
        div{
            &:last-of-type{
                

                font-size: 14px;
                color: #7d7d7d;
                flex: 1;
                overflow-y: scroll;
                div{
                  

                    position: relative;
                    padding: 16px;
                    transition: all .5s ease;
                    cursor: pointer;
                    border-bottom: 1px solid #ddd;


                    &:hover{
                        background: #f7f7f7;
                    }
                    span{
                        position: absolute;
                        top: 17px;
                        left: 10px;
                        content: '';
                        width: 10px;
                        height: 10px;
                     background: crimson;
                        transform: translate(-50%,-0%);
                        border-radius: 50%;
                        z-index: 9;
                    }
                    h6{
                        margin-bottom: 0;
                        color: #757575;
                        font-size: 14px;
                        font-weight: 400;
                        display: inline-block;
                            width: 96%;
    margin-left: 14px;
                    }
                }

                /* width */
                &::-webkit-scrollbar {
                    width: 5px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                    background: #b5b5b5;
                }

                /* Handle on hover */
                &::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            }
        }
    }
}
@media (max-width: 575.98px){
  .all-alerts .alert-content{
      height: auto !important;
      display: block !important;
  }
  .all-alerts .alert-content div:last-of-type{
      margin-right:auto;
      
      div{
          border-bottom: 1px solid #ccc;
          img{
                display: block;
                text-align: center;
                margin: auto;
            }
      }
  }
}
@media (min-width: 576px) and (max-width: 767.98px){
  .page-container{
    margin-left:43px !important;
  }
}
@media (min-width: 768px) and (max-width: 991.98px){
  .page-container{
    margin-left:43px !important;
  }
}
</style>