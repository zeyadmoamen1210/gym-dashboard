<template>
      <div class="sales-card">

          <div class="icons">
              <slot name="operations">

              </slot>
          </div>

          <div class="personal-info">
               <div>
                    <vs-avatar v-if="sales.photo" size="70">
                        <img :src="sales.photo" alt="">
                    </vs-avatar>
                    <vs-avatar v-else size="70">
                        <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                    </vs-avatar>
               </div>
               <div>
                  <h6> {{sales.username}} </h6>
                   <span>Mobile: {{sales.phone}} </span>
                   <span>Email: {{sales.email}} </span>
               </div>
          </div>


          <div class="password-attendance">
              
            <slot name="password-attendance">

            </slot>
          </div>

          

          <div class="sales-footer">
              <div>
                  <h6>Sales ID: {{sales.id}} </h6>
              </div>
              <div>
                  <h6 v-if="sales.sesstion && sales.sessions.length"> {{ sales.sessions.length }} </h6>
                  <h6 v-else> No Sessions </h6>
              </div>
          </div>

      </div>
</template>

<script>
// import axiosApi from '@/plugins/axios.js';
export default {
    props:["sales"],
    data(){
        return {
            showDeleteConfirm: false,
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.sales-card{
    position: relative;
    background: #fdfdfd;
    margin-bottom: 17px;
    border: 1px solid #2c4484ad;
    
    .personal-info{
        padding: 19px;
        display: flex;
        padding-bottom:0;
        h6{
            margin-bottom: 4px;
            padding-top: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        div{
            &:last-of-type{
                padding:0 5px;
                overflow: hidden;
            }
        }
        span{
                font-size: 14px;
    color: #8e8b8b;
    display: block;
        }
    }

    .icons{
        position: absolute;
        top: 8px;
        right: 12px;
        display: flex;
        div{
            margin: 0 5px;
            button{
                background: none;
                border: none;
                img{
                    width: 13px;
                }
            }
            
        }
    }

    .sales-footer{
        display:flex;
        border-top:1px solid #CCC;
        div{
            padding: 0 19px;
            &:first-of-type{
                flex:1;
                h6{
                    font-size: 11px;
                    margin: 0;
                    padding: 6px 0 0 0;
                    color: #3333337a;
                }
            }
            &:last-of-type{
                h6{
                    color: #17a2b8;
                    font-size: 11px;
                    margin-bottom: 0;
                    padding: 6px 0 7px 0;
                }
            }
        }
    }
    .password-attendance{
        display: flex;
        justify-content: center;
    }
}
</style>