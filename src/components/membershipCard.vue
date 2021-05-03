<template>
  <div class="membership-card">

        <div class="icons">
            <slot name="operations">
                
            </slot>
        </div>

      <div v-if="subscription.title" class="membership-header">
          {{subscription.title}}
      </div>
      <div v-else class="membership-header">
          No Name
      </div>
      
      <div class="membership-content">
          <h4 v-if="subscription.duration.includes('d') || subscription.duration.includes('D')">{{parseInt(subscription.duration)}} Days</h4>
          <h4 v-else-if="subscription.duration.includes('m') || subscription.duration.includes('M')">{{parseInt(subscription.duration)}} Minutes</h4>
          <h4 v-if="subscription.duration.includes('y') || subscription.duration.includes('Y')"> {{parseInt(subscription.duration)}} Years</h4>
          <h6>membership</h6>
          <div class="membership-feature">
              <div>
                  <img src="@/assets/snowflake-gold.svg" style="width:15px" alt="">
              </div>
              <div>
                  <h6 style="    font-size: 11px;"> {{subscription.frees}}  Days Freezing</h6>
                  
              </div>
              <div>
                <img src="@/assets/snowflake-gold.svg" style="width:15px" alt="">

              </div>
          </div>

          <h6 class="feature" v-if="subscription.sessions"> {{subscription.sessions}} Private Sessions </h6>
          <h6 class="feature" v-else style="color:var(--danger)"> No Sesstions </h6>

          <div class="membership-price">
              <h4>EGP <span> {{subscription.price}} </span> </h4>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['subscription']
}
</script>

<style lang="scss" scoped>
.membership-card{
    position: relative;
        box-shadow: 0 4px 25px 0 #b18c3494;
    margin-bottom: 24px;
    border-radius: 20px 0;
    overflow: hidden;
    transition: all .3s linear;
    &:hover{
        transform: translateY(-5px);
    }
    .membership-header{
        background: linear-gradient(45deg, #a28132, #f1bc3f) !important;
        padding: 10px;
        color: #FFF;
        font-size: 27px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .icons{
       position: absolute;
        bottom: 9px;
        right: 5px;
        // display: flex;
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


    .membership-content{
        h4{
                text-align: center;
    margin-bottom: 0;
        }
        h6{
                text-align: center;
    margin-bottom: 0;
        font-size: 13px;
        }
        .feature{
           font-size: 12px;
    color: #ababab;
    padding-bottom: 8px;
    /* margin-bottom: 20px; */
    border-bottom: 1px solid #CCC;
    width: 73%;
    margin: auto;
        }
        .membership-feature{
                text-align: center;
                margin-bottom: 2px;
            div{
                display: inline-block;
            }
        }
        .membership-price{
                padding: 9px 0;
                color:#edb93f;
                span{
                        font-weight: bold;
    font-size: 32px;
    color: #b99236;
                }
        }
    }
}
</style>