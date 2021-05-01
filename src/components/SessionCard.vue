<template>
  <section class="session-card">


    <div class="sessions" @click="$router.push(`/session/${session.sessionId}`)" v-for="session in session.time" :key="session.sessionId">
        <h6 style="color: #2c4484;"> Trainer: </h6>
      <div class="sesstion-trainer">
          <div >
            <vs-avatar v-if="session.trainer.photo">
                <img :src="session.trainer.photo" alt="">
            </vs-avatar>
            <vs-avatar v-else>
                <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
            </vs-avatar>
          </div>
          <div>
              <h6> {{session.trainer.username}} </h6>
          </div>
      </div>


    <h6 style="color: #2c4484;"> User: </h6>
      <div class="sesstion-user">
          <div >
            <vs-avatar v-if="session.user.photo">
                <img :src="session.user.photo" alt="">
            </vs-avatar>
            <vs-avatar v-else>
                <img src="https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg" alt="">
            </vs-avatar>
          </div>
          <div>
              <h6> {{session.user.username}} </h6>
          </div>
      </div>

      <h6 class="time" style="color: #2c4484;"> {{ new Date(session.time).toLocaleString() }} </h6>
    </div>

      
  </section>
</template>

<script>
export default {
    props:['session']
}
</script>

<style lang="scss">
.session-card{
    padding: 15px;
    background: #fff;
    box-shadow: 0 4px 25px 0 #0000001a;
    margin:15px;
    cursor: pointer;
    height: 208px;
    overflow-y: scroll;
    &:hover{
        transform: translateY(-10px);
        transition: all .5s linear;
    }
    >h6{
        color:#2c4484;
    }
    .time{
        text-align: center;
    }
    .sesstion-trainer,.sesstion-user{
        display: flex;
        h6{
            margin: 10px 16px;
        }
        
        padding-bottom:5px;
        margin-bottom:5px;
    }
    .sesstion-trainer{
        border-bottom: 1px solid #ccc;
    }

    .sessions{
        &:hover{
            background: #f7f7f7;
            transition: all .5s ease;
        }
    }
}
</style>