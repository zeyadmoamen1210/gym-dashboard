<template>
  <div :style="{'border-left-color': randomColor()}" class="payment-card">
      <h6> <img style="width:25px" src="@/assets/home/key.svg" alt=""> {{payment.pay._id}} </h6>

      <h6> <img style="width:25px" src="@/assets/home/payment.svg" alt=""> {{payment.pay.amount}} </h6>
      <h6>  <img style="width:25px" src="@/assets/home/calendar.svg" alt=""> {{ $moment(payment.pay.date).format("dddd, MMMM Do YYYY, h:mm:ss a") }} </h6>
  </div>
</template>

<script>
export default {
    props:['payment'],
    data(){
        return{
            colors:[
                '#833471',
                '#5758BB',
                '#009432',
                '#EE5A24',
                '#FFC312',
                '#FDA7DF',
                '#ED4C67',
                '#1B1464',
                '#006266',
                '#006266',
            ]
        }
    },
    methods:{
        randomColor(){
            console.log(this.colors[Math.floor(Math.random() * 10)] , )
            return this.colors[Math.floor(Math.random() * 10)];
        }
    }
}
</script>

<style lang="scss">
.payment-card{
    padding: 10px;
    background: #f7f7f7;
    margin-left: 7px;
    border-left-width: 3px;
    border-left-style: solid;
    margin-bottom: 15px;
    >h6{
        background: #FFF;
        padding: 8px;
        color: #484848;
        border-bottom: 1px solid #e4e4e4;
        font-weight: 400;
    }
}
</style>