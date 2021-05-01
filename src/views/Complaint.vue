<template>
  <div class="complaint-page">
      <div class="container">
           <div class="complaint-head">
                    <div style="display:flex;flex:1">
                        
                        <div>
                            <h4 class="head">Complaint</h4>
                        </div>
                    </div>
            </div>

            <div class="complaint-section">
            <div>
                        <div class="users">
                        <!-- <div class="form-group">
                            <vs-input state="b99236" color="#b99236" v-model="search" placeholder="Search ..">
                                <template #icon>
                                <img style="width:15px" src="@/assets/loupe.svg" alt="">
                                </template>
                            </vs-input>
                        </div> -->

                        <div class="user" @click="assignUserCom(complaint)" v-for="complaint in allComplaints" :key="complaint.id">
                            <div >
                                <vs-avatar size="50" v-if="complaint && complaint.user && complaint.user.photo">
                                    <img :src="complaint.user.photo" alt="">
                                </vs-avatar>
                                <vs-avatar size="50" v-else>
                                    <img src="https://res.cloudinary.com/dvtdxd9xx/image/upload/v1612687522/vinexaxyxbpuyxbzfvwt.jpg" alt="">
                                </vs-avatar>
                            </div>
                            <div v-if="complaint && complaint.user ">
                                <div>
                                    <h6 style="font-size: 14px"> {{complaint.user.username}} </h6>
                                    <span> {{ new Date(complaint.time).toLocaleDateString() }} </span>
                                </div>
                                <p> {{ complaint.comment[complaint.comment.length - 1].comment }} </p>
                            </div>
                        </div>
                    </div>



                    

                    <div  style="  position:relative;flex: 1">

                        <div class="header" v-if="selectedUser && selectedUser.user">
                            <div class="user">
                                <div>
                                    <vs-avatar >
                                        <img :src="selectedUser.user.photo" alt="">
                                    </vs-avatar>
                                </div>
                                <div>
                          
                                            <h6 style="font-size: 17px;padding-top: 12px;text-transform: capitalize;"> {{selectedUser.user.username}} </h6>
                                            <!-- <h6>To Me</h6> -->
                                      
                                        
                                </div>
                                <div>
                                    <span> {{new Date(selectedUser.time).toLocaleDateString()}} </span>
                                </div>
                            </div>
                        </div>

                        <div style="       margin-bottom: 70px;  overflow-x: hidden; height: 500px;overflow-y: scroll;" id="emailSec" class="email-section" v-if="selectedUser && selectedUser.user">
                        


                        <div  v-for="comment in selectedUser.comment" :key="comment._id">
                            <div style="display:block" v-if="comment.user.id == selectedUser.user.id">
                                <h6 style="display: inline-block;;margin: 15px 20px;color: #656565;">
                                    <h6 style="padding: 10px;background: #EEE;border-radius: 9px;">
                                        {{ comment.comment }}
                                    </h6>

                                    
                                    <span style="display:block;font-size: 9px;margin: 5px 0px;"> {{$moment(comment.date).fromNow()}} </span>

                                </h6>
                            </div>

                            <div style="display: block;overflow: hidden;width: 100%;" v-else>
                                <h6 style="display: inline-block;margin: 15px 20px;color: rgb(255 255 255);text-align: right;float: right;">
                                   <h6 style="background: rgb(44 68 132);padding: 10px;border-radius: 9px;">
                                        {{ comment.comment }}
                                   </h6>
                                <span style="display: block;color: #333;font-size: 9px;margin: 5px 0;"> {{ $moment(comment.date).fromNow() }} </span>

                                </h6>
                            </div>
                        </div>

                        
                    <div class="send-section">
                            <div>
                                <vs-input
                                    placeholder="Replay" @keyup.enter="sendComplant" v-model="myComment"/>
                                <div class="icons">
                                    <!-- <img src="@/assets/paper-clip.svg" alt=""> -->
                                    <img @click="sendComplant" src="@/assets/send.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

            </div>

                    </div>
                     



                   
            </div>
      </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios';
export default {
    components:{
        
    },
    created(){
        this.getAllComplaints();

    },
    data(){
        return{
            allComplaints: [],
            page:1,
            totalPages: 1,
            selectedUser:{
            },
            myComment:""
        }
    },
    methods:{
        sendComplant(){
            if(this.selectedUser && this.selectedUser.user){
                const loading = this.$vs.loading();
                axiosApi.post(`/responseComplaint`, {
                    userId: this.selectedUser.user.id,
                    comment: this.myComment
                }).then(() => {
                    this.myComment = " ";
                    this.getAllComplaints(this.selectedUser);

                }).finally(() => loading.close());
            }
        },
        assignUserCom(complaint){
            if(document.querySelector('#emailSec')){
                document.querySelector('#emailSec').scrollTop = document.querySelector('#emailSec').scrollHeight
            }

            this.selectedUser = complaint;

        },
        getAllComplaints(selectedUser = null){
            const loading = this.$vs.loading();
            axiosApi.get(`/fetchComplaints`).then((res) => {
                this.allComplaints = res.data.docs;
                this.page = res.data.docs;
                this.totalPages = res.data.totalPages;

                if(selectedUser != null){
                    console.log("selected ")
                    this.selectedUser = this.allComplaints.find(ele => {
                        return ele.id === selectedUser.id
                    })
                    console.log(this.allComplaints.find(ele => {
                        return ele.id === selectedUser.id
                    }))

                        


                }else{
                    this.selectedUser = this.allComplaints[0];
                }

              


                
            }).finally(() => loading.close());

            console.log( document.querySelector('#emailSec'))


        if(document.querySelector('#emailSec')){

            document.querySelector('#emailSec').scrollTop = document.querySelector('#emailSec').scrollHeight
        }

        }
    }
}
</script>

<style lang="scss">



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



.complaint-page{
    padding: 15px 23px;
    .complaint-head{
    display: flex;
    flex-wrap: wrap;
    div{
      .logo{
        h4{
          padding-top:5px;
          margin-left: 10px;
        }
      }
    }
    .head{
          color: #2c4484;
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 26px;
      
    }

    }

    .complaint-section{
        border:1px solid #eaeaea;
        >div{
            display: flex;
        flex-wrap: wrap;
        }
        width: 100%;
        .users{
            max-height: 500px;
            overflow-y: scroll;
            overflow-x: hidden;
            .form-group{
                margin-bottom: 10px;
                margin-top: 10px;
                input{
                    width: 100%;
                }
            }
            .user{
                padding: 8px 3px 0;
            }
            /* width */
            &::-webkit-scrollbar {
            width: 3px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
            background: #f7f7f7; 
            }
            
            /* Handle */
            &::-webkit-scrollbar-thumb {
            background: #999; 
            }

            /* Handle on hover */
            &::-webkit-scrollbar-thumb:hover {
            background: #555; 
            }
            .user{
                @include user;
            }
        }
    }

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
            position: absolute;
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