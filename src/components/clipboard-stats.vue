<template>
    <div class="numeric-stats">
      <div class="row">
        <div class="col-md-6 col-sm-6">
            <div class="total-subscription">
            <div>
                <div>
                    <img src="@/assets/navbar-icons/group.svg" alt="">
                </div>
                <div style="margin: auto">
                    <h6> {{values.users}} </h6>
                    <h6>All Users</h6>
                </div>
                </div>
            </div>
        </div>

          <div class="col-md-6 col-sm-6">
              <div class="total-subscription second">
                <div>
                      <div>
                            <img src="@/assets/navbar-icons/whistle.svg" alt="">

                      </div>
                        <div style="margin: auto">
                            <h6> {{values.trainers}} </h6>
                            <h6>All Trainers</h6>
                        </div>
                  </div>

              </div>
          </div>


          <div class="col-md-6 col-sm-6">
              <div class="total-subscription third">
                  <div>
                      <div>
                          <img src="@/assets/navbar-icons/group.svg" alt="">
                          
                      </div>
                        <div style="margin: auto">
                            <h6> {{values.reciptionest}} </h6>
                            <h6>Reciptionest</h6>
                        </div>
                  </div>
                

              </div>
          </div>


          <div class="col-md-6 col-sm-6">
              <div class="total-subscription third">
                  <div>
                      <div>
                          <img src="@/assets/navbar-icons/group.svg" alt="">
                          
                      </div>
                        <div style="margin: auto">
                            <h6> {{values.salles}} </h6>
                            <h6>All Sales</h6>
                        </div>
                  </div>
                

              </div>
          </div>
      </div>
      
    </div>
</template>

<script>
export default {
    props:['values']
}
</script>

<style lang="scss">

.numeric-stats{
    padding: 14px;
}
.total-subscription{
    padding: 21px 22px;
    background: linear-gradient(60deg, #936634, #E39C48);
    color: #FFF;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 10px;
    border-radius: 7px;
    h6{
        font-size: 16px;
        &:first-of-type{
            margin-bottom:0;
        }
    }

    >div{
        display: flex;
        flex-wrap: wrap;
        div{
            &:first-of-type{
                flex:1;
                img{
                        width: 40px;
                }
                
            }
        }
    }

}

.second{
    
    background: linear-gradient(60deg, #2C748D, #74D0E9);

        
    
    
}
.third{
    background: linear-gradient(60deg, #3C3A75, #6D79B4);

        
    
}
</style>