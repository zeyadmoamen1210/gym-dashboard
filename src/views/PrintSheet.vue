<template>
  <div class="print-sheet-page">
    <div class="container"  >

      <StarHeader style="margin-bottom: 15px;" title="Print Sheet" />
        <div class="print-sheet-tabs">
 
          <b-tabs pills >
            <b-tab title="Member Sheets" active>
              <b-card-text>
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <div class="sheet" @click="$router.push(`/members-sheets/gym-contract`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Gym Contract Fit House</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/member-lead-form`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Member Lead Form Fit House</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/guest-information`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Guest Information</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/fitness-profile`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Fitness Profile</h6>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-4">
                    <div>
                      <div class="sheet" @click="$router.push(`/members-sheets/fitnessTest`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Fitness Test</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/gym-instructions`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Gym Instructions</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/complaints`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Complaints</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/main-price-list`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Main Price List</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/visits-price-lists`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Visit Price List</h6>
                      </div>

                      <div class="sheet">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">

                        <h6>Private Trainer Price List</h6>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-4">
                    <div>
                      <div style="text-align:right" class="sheet" @click="$router.push(`/members-sheets/confirmation-of-payment`)">

                        <h6>اقرار دفع</h6>
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      </div>

                      <div style="text-align:right" class="sheet" @click="$router.push(`/members-sheets/confirmation`)">

                        <h6>اقرار</h6>
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      </div>

                      

                      <div style="text-align:right" class="sheet" @click="$router.push(`/members-sheets/receipt`)">

                        <h6>ايصال استلام </h6>
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      </div>

                      <div style="text-align:right" class="sheet" @click="$router.push(`/members-sheets/receipt-of-cash`)">

                        <h6>ايصال استلام نقدية</h6>
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      </div>

                      <div style="text-align:right" class="sheet" @click="$router.push(`/members-sheets/reconnaissance`)">

                        <h6>استطلاع</h6>
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Employee Sheets">
              <b-card-text>
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <div class="sheet" @click="$router.push(`/members-sheets/classes-attendance`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Classes Attendance Sheet</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/attendance`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Attendance</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/employee-record`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Employee Record</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/personal-trainer-contract`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Personal Trainer</h6>
                      </div>

                      <div class="sheet" @click="$router.push(`/members-sheets/phone-call`)">
                        <img src="@/assets/ballot.svg" style="width:20px" alt="">
                        <h6>Phone Call</h6>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                  <div>
                    <div class="sheet" @click="$router.push(`/members-sheets/break-sheet`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Break Sheet</h6>
                    </div>

                    <div class="sheet" @click="$router.push(`/members-sheets/sales-indoor`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Sales Indoor</h6>
                    </div>

                    <div class="sheet" @click="$router.push(`/members-sheets/appraisal`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Appraisal</h6>
                    </div>

                    <div class="sheet" @click="$router.push(`/members-sheets/maintenace`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Maintenance</h6>
                    </div>

                  </div>
                </div>

                <div class="col-md-4">
                  <div>
                    

                    <div class="sheet" @click="$router.push(`/members-sheets/program-design`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Program Design</h6>
                    </div>

                    <div class="sheet" @click="$router.push(`/members-sheets/warm-up`)">
                      <img src="@/assets/ballot.svg" style="width:20px" alt="">
                      <h6>Warm Up</h6>
                    </div>
                  </div>
                </div>

                </div>

                
              </b-card-text>
            </b-tab>
          </b-tabs>
        </div>
    </div>
  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader'
export default {
  components:{
    StarHeader
  }
}
</script>

<style lang="scss">
.print-sheet-page{
  padding: 10px 0;
  .print-sheet-tabs{
    padding: 10px;
    box-shadow: 0px -2px 11px 0 #0000001a;
    padding-bottom: 19px;
    border-radius: 23px 23px 0 0;

    .card-text{
      margin-top:17px;
    }

    .nav{
      padding: 7px 0 0;
      background: #f7f7f7cc;
      border-radius: 16px 16px 0 0;
      border-bottom: 2px solid #EEE;
    }

    .sheet{
      padding: 14px 10px;
      border: 1px solid #2c44848a;
      margin: 10px;
      border-radius: 8px;
      background: #f7f7f770;
      transition: all .2s linear ;
      cursor: pointer;

      h6{
        margin-bottom: 0;
        font-size: 15px;
        color: #2f2f2f;
        font-family: sans-serif;
        display: inline-block;
        margin: 0 7px;
      }

      &:hover{
        transform: translateY(-2px);
        border:1px solid #2c4484;
        background: #FFF;
      }
    }
  }
  .nav-pills .nav-link.active, .nav-pills .show > .nav-link{
    color: #2c4484ba !important;
    border-bottom: 2px solid #2c4484 !important;
    background: none;
    font-weight: bold;
    border-radius: 0;
  }
}
</style>