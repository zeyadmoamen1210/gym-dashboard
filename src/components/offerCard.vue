<template>
  <div class="offer-card">
      <div class="offer-header">
          <img v-if="offer.photo" :src="offer.photo" alt="">
      </div>
      <div class="offer-content">
          <h5> {{offer.title}} </h5>
          <!-- <p>Offer Description Here</p> -->

          <div class="offer-value">
              {{offer.price}} <br/>
              Price
          </div>
      </div>
      <div class="offer-subscribers">
        <vs-avatar-group max="7">
            <vs-avatar v-for="user in offer.users" :key="user.id">
              <img :src="user.photo" alt="">
            </vs-avatar>
            
           
       
      </vs-avatar-group>
      </div>

      <div>
          <vs-button @click="$router.push(`/add-membership?id=${offer.id}&type=offer&title=${offer.title}&duration=${offer.duration}&frees=${offer.frees > 0 ? offer.frees : 0}&price=${offer.price > 0 ? offer.price : 0}&sessions=${offer.sessions > 0 ? offer.sessions : 0 }`)">+</vs-button>
      </div>
  </div>
</template>

<script>
export default {
    props:['offer']
}
</script>

<style lang="scss" scoped>
.offer-card{
        box-shadow: 0 4px 25px 0 #0000001a;
    margin-bottom: 24px;
    .offer-header{
        height:140px;
        img{
            width:100%;height:100%;
        }
    }
    .offer-content{
        position: relative;
        padding: 7px 15px 0;
        h5{
            margin-bottom: 0;
        }
        p{
            margin-bottom: 0;
        }
        .offer-value{
            position: absolute;
            top: -19px;
            right: 15px;
            padding: 7px 13px;
            background: #f85b1c;
            color: #FFF;
            border-radius: 8px;
            font-size: 10px;
        }
    }
    .offer-subscribers{
        padding: 7px 15px 10px;
        display: flex;
        min-height: 61px;
        div{
            
        }
    }

    .vs-avatar__group:not(.float) .vs-avatar-content img{
        height:40px !important;
    }
}
</style>