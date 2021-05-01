<template>
  <div class="container single-session" >
      Chat Between
      <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #333">
          <div class="row">
          <div class="col-md-6">
              <div>
              
                <div v-if="session && session.trainer">
                    <vs-avatar style="margin:auto" size="70" v-if="session && session.trainer && session.trainer.photo">
                        <img :src="session.trainer.photo" alt="">
                    </vs-avatar>
                    <vs-avatar style="margin:auto" size="70" v-else>
                        <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                    </vs-avatar>
                </div>
               
               <h6 v-if="session.trainer && session.trainer.username" style="text-align:center;margin-bottom:0;    font-size: 19px;"> {{session.trainer.username}} </h6>
               <h6 style="text-align:center;color: #2c4484;"> Trainer </h6>
              </div>
          </div>

          <div class="col-md-6">
              <div>
                <div>
                    <vs-avatar style="margin:auto" size="70" v-if="session.user.photo">
                        <img :src="session.user.photo" alt="">
                    </vs-avatar>
                    <vs-avatar style="margin:auto" size="70" v-else>
                        <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                    </vs-avatar>
                </div>
                <h6 style="text-align:center;margin-bottom:0;    font-size: 19px;"> {{session.user.username}} </h6>
                  <h6 style="text-align:center;color: #2c4484;"> Trainee </h6>
              </div>
          </div>
      </div>
      </div>
       <div  style="  position:relative;flex: 1">

                       

                        <div style="overflow-x: hidden;" id="emailSec" class="email-section" >
                        


                        <div  v-for="comment in session.comment" :key="comment._id">
                            <div style="display:block" v-if="comment.user && comment.user.role == 'trainer'">
                                <h6 style="display: inline-block;;margin: 15px 20px;color: #656565;">
                                    <div style="display:flex;">          
                                        <div>
                                            <vs-avatar v-if="session.trainer && session.trainer.photo">
                                                <img :src="session.trainer.photo" alt="">
                                            </vs-avatar>
                                            <vs-avatar v-else>
                                                <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                                            </vs-avatar>
                                        </div>
                                        <h6 style="padding: 10px;background: #EEE;border-radius: 9px;">
                                        {{ comment.comment }}
                                    </h6>
                                    </div>
                                    

                                    
                                    <!-- <span style="display:block;font-size: 9px;margin: 5px 0px;"> {{$moment(comment.date).fromNow()}} </span> -->

                                </h6>
                            </div>

                            <div style="display: block;overflow: hidden;width: 100%;" v-else>
                                <h6 style="display: inline-block;margin: 15px 20px;color: rgb(255 255 255);text-align: right;float: right;">
                                   <div style="display:flex;flex-direction:row-reverse">          
                                        <div>
                                            <vs-avatar v-if="session.trainer && session.trainer.photo">
                                                <img :src="session.trainer.photo" alt="">
                                            </vs-avatar>
                                            <vs-avatar v-else>
                                                <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
                                            </vs-avatar>
                                        </div>
                                        <h6 style="background: rgb(44 68 132);padding: 10px;border-radius: 9px;">
                                            {{ comment.comment }}
                                        </h6>
                                    </div>

                                   
                                <!-- <span style="display: block;color: #333;font-size: 9px;margin: 5px 0;"> {{ $moment(comment.date).fromNow() }} </span> -->

                                </h6>
                            </div>
                        </div>

                        
                    
                    </div>


                    

            </div>

          
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'
export default {
    created(){
        this.getSession()
    },
    data(){
        return{
            session:{}
        }
    },
    methods:{
        getSession(){
            let loading = this.$vs.loading();
            axiosApi.get(`/getSession?id=${this.$route.params.id}`).then(res => {
                this.session = res.data;
            }).finally(() => loading.close())
        }
    }
}
</script>

<style lang="scss" scoped>


@mixin user{
                overflow: hidden;
                display: flex;
                padding: 5px;
                transition: all .5s ease;
                &:hover{
                    cursor: pointer;
                    background: #e6e6e6;
                    border: 1px solid #2c4484;
                }  
                div{
                    &:last-of-type{
                        overflow: hidden;
                        margin-left: 5px;
                        div{
                            display: flex;
                            h6{
                                margin-bottom:0;
                                font-size: 13px;
                                flex: 1;
                                margin-bottom: 2px;
                                margin-top: 5px;
                            }
                            span{
                                font-size: 10px;
                                font-weight: 500;
                                color: #989898;
                            }
                        }
                        
                        p{
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: inline-block;
                            width: 100%;
                            font-size: 13px;
                            margin-bottom: 0;
                            color: #aba9a9;
                            margin-left: 5px;
                        }
                    }
                }
            }
















        .single-session{
    padding: 15px 23px;
   
    
      .user{
            background: #FFF !important;
            display: flex;
        }
        
        .user{
            width: 100%;
            width: 100%;
            padding: 17px;
            background: #f7f7f77d !important;
            border-bottom: 1px solid #ececec;
            >div{
                &:nth-of-type(2){
                    flex: 1;
                   h6{
                       &:first-of-type{
                            margin: 0;
                            font-size: 14px;
                            padding: 5px 5px 0;
                       }
                       &:last-of-type{
                            font-size: 12px;
                            padding: 2px 5px 0;
                            font-weight: 400;
                       }
                   }
                }
            }
        }


    .header{
            width:100%;
            background: #FFF !important;
        }

    .email-section{
        flex: 3;
        span{
            font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    color: #2c4484;
        }
      


        

    }

    

.send-section{
            position: relative;
            bottom: 0;
            padding: 15px;
            background: #fbfbfb;
            width: 100%;
            border-top: 1px solid #EEE;
            >div{
                position: relative;
                input{
                    width: 100%;
                }
                div.icons{
                    position: absolute;
                    right: 7px;
                    top: 7px;
                    img{
                        width: 20px;
                        &:first-of-type{
                            margin:0 5px;
                        }
                    }
                }
            }
        }




    
}
</style>