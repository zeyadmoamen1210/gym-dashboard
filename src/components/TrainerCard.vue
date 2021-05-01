<template>
      <div class="trainer-card">

          <div class="icons">
              <slot name="operations">
                   
              </slot>
          </div>

          <div class="personal-info">
               <div>
                    <vs-avatar v-if="trainer.photo" size="70">
                        <img :src="trainer.photo" alt="">
                    </vs-avatar>
                    <vs-avatar v-else size="70">
                        <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                    </vs-avatar>
               </div>
               <div>
                   <h6> {{trainer.username}} </h6>
                   <span style="display:block">Mobile: {{trainer.phone}} </span>
                   <span style="display:block">Email: {{trainer.email}} </span>
               </div>
          </div>

          <div class="trainer-footer">
              <div>
                  <h6>Trainer ID: {{trainer.id}} </h6>
              </div>
              <div>
                  <h6 v-if="trainer.sessions.length"> {{ trainer.sessions.length }} </h6>
                  <h6 v-else> No Sessions </h6>
              </div>
          </div>


      

   

      </div>
</template>

<script>
// import axiosApi from '@/plugins/axios.js';
export default {
    props:["trainer"],
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
.trainer-card{
    position: relative;
    background: #fdfdfd;
    margin-bottom: 17px;
    border: 1px solid #2c4484ad;
    
    .personal-info{
        padding: 19px;
        display: flex;
        h6{
            margin-bottom: 3px;
            padding-top: 10px;
        }
        div{
            &:last-of-type{
                padding:0 5px
            }
        }
        span{
            font-size: 10px;
            color: #8e8b8b;
            display: block;
            margin-bottom: 3px;
            &:last-of-type{
                
            }
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

    .trainer-footer{
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
}
</style>