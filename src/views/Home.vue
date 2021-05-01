<template>
  <div>
    <!-- <Sidebar /> -->

    <div class="container">
      <StarHeader style="margin-top: 10px;" title="Dashboard" />

      <div class="row">
        <div class="col-md-6">
          <ClipboadMainStats :values="homeData" />
          <apexchart
            type="bar"
            ref="obligationsAndPaid"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
        <div class="col-md-6">
          <h6 style="padding: 0 21px;color: #2c4484;font-size: 19px;">🚀🚀 See Our Profits</h6>
          <apexchart
            ref="profits"
            type="line"
            height="450"
            :options="chartOptionsthree"
            :series="series3"
          ></apexchart>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <apexchart
            type="bar"
            ref="users"
            height="350"
            :options="chartOptionstwo"
            :series="series2"
          ></apexchart>
        </div>

        <div class="col-md-4">
          <div class="alert-messages">
            <ul>
              <li v-for="alert in alerts" :key="alert.id">
                {{ alert.status }}
              </li>
            </ul>
          </div>
        </div>


        <div class="col-md-6" style="border-right: 1px solid #2c448475;">
          <div>
            <StarHeader title="Payments" />

            <div class="select-dates">
              <div>
                <label> Start From </label>
                <datetime style="width:100%" hidden-name="Strat From" title="Start From" input-class="select-time" v-model="paymentsDates.startFrom" type="datetime"></datetime>
              </div>
              <div>
                <label> End To </label>
                <datetime style="width:100%" hidden-name="End To" title="End To" input-class="select-time" v-model="paymentsDates.endTo" type="datetime"></datetime>
              </div>
              <div>
                <vs-button @click="getPayments(false, 1)">Update</vs-button>
              </div>
            </div>

            <NoData v-if="payments.length == 0" />
            <div v-else class="row">
              <div class="col-md-12" v-for="payment in payments" :key="payment.id">
                <PaymentCard :payment="payment" />
              </div>
            </div>

            <div v-if="paymentTotalPages > 1" class="pagination-container" style="padding-bottom: 25px;">
                <div class="center con-pagination">
                    <vs-pagination progress v-model="paymentPage" :length="paymentTotalPages" />
                </div>
            </div>


          </div>
        </div>


        <div class="col-md-6">
          <div>
            <StarHeader title="Expenses" />

            <div class="select-dates">
              <div>
                <label> Start From </label>
                <datetime style="width:100%" hidden-name="Strat From" title="Start From" input-class="select-time" v-model="expensesDates.startFrom" type="datetime"></datetime>
              </div>
              <div>
                <label> End To </label>
                <datetime style="width:100%" hidden-name="End To" title="End To" input-class="select-time" v-model="expensesDates.endTo" type="datetime"></datetime>
              </div>
              <div>
                <vs-button @click="getExpenses(false, 1)">Update</vs-button>
              </div>
            </div>

             <NoData v-if="expenses.length == 0" />
             <div v-else class="row">
              <div class="col-md-12" v-for="expense in expenses" :key="expense.id">
                <ExpenseCard :expense="expense" />
              </div>
            </div>

            <div v-if="expensesTotalPages > 1" class="pagination-container" style="padding-bottom: 25px;">
                <div class="center con-pagination">
                    <vs-pagination progress v-model="expensesPage" :length="expensesTotalPages" />
                </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Sidebar from '@/components/Sidebar.vue'
import ClipboadMainStats from "@/components/clipboard-stats.vue";
import axiosApi from "@/plugins/axios.js";
import StarHeader from "@/components/StarHeader.vue";
import PaymentCard from "@/components/PaymentCard.vue";
import ExpenseCard from "@/components/ExpenseCard.vue";
import NoData from "@/components/NoData.vue";



export default {
  name: "Home",
  components: {
    ClipboadMainStats,
    StarHeader,
    PaymentCard,
    ExpenseCard,
    NoData
  },
  created() {
    this.getPayments();
    this.getHomeData();
    this.getAlerts();
    this.getProfts();
    this.getExpenses();
  },
  watch:{
    expensesPage(val){
      this.getExpenses(false, val)
    },
    paymentPage(val){
      this.getPayments(false, val)
    }
  },
  methods: {
    getPayments(defaultDate = true, page = 1){
      let loading = this.$vs.loading();
      if(defaultDate){
        this.paymentsDates.startFrom = this.$moment().subtract(1, 'months').utc().format();
        this.paymentsDates.endTo = this.$moment().utc().format();
      }
      axiosApi.post(`/getPayments?limit=3&page=${page}`, {
        startFrom: this.paymentsDates.startFrom,
        endTo: this.paymentsDates.endTo
      }).then(res => {
        this.payments = res.data.docs;
        this.paymentPage = res.data.page,
        this.paymentTotalPages = res.data.totalPages
      }).finally(() => loading.close());
    },

    getExpenses(defaultDate = true, page = 1){
      let loading = this.$vs.loading();
      if(defaultDate){
        this.expensesDates.startFrom = this.$moment().subtract(1, 'months').utc().format();
        this.expensesDates.endTo = this.$moment().utc().format();
      }
      axiosApi.post(`/getExpenses1?limit=3&page=${page}`, {
        startFrom: this.expensesDates.startFrom,
        endTo: this.expensesDates.endTo
      }).then(res => {
        this.expenses = res.data.docs;
        this.expensesPage = res.data.page,
        this.expensesTotalPages = res.data.totalPages
      }).finally(() => loading.close());
    },

    
    getAlerts() {
      axiosApi.get(`/getAlerts?limit=5`).then((res) => {
        this.alerts = res.data.docs;
      });
    },
    getHomeData() {
      let loading = this.$vs.loading();
      axiosApi
        .get(`/getHome`)
        .then((res) => {
          this.homeData = res.data;

          this.$refs.obligationsAndPaid.updateSeries(
            [
              {
                name:"Paid",
                data: this.homeData.firstDraw.paid,
              },
              {
                name:"Obligations",
                data: this.homeData.firstDraw.obligation,
              },
            ],
            false,
            true
          );

          this.$refs.users.updateSeries(
            [
              {
                data: this.homeData.secondDraw.values,
              },
            ],
            false,
            true
          );
        })
        .finally(() => loading.close());
    },
    getProfts(){
      let loading = this.$vs.loading();
      axiosApi.get('/getProfits').then(res => {
        this.$refs.profits.updateSeries(
            [
              {
                name:"Profit",
                data: res.data,
              },
            ],
            false,
            true
        );
      }).finally(() => loading.close())
    }
  },
  data() {
    return {
      paymentPage:1,
      paymentTotalPages:1,
      payments: [],
      expensesPage:1,
      expensesTotalPages:1,
      expenses:[],
      expensesDates:{
        startFrom:"",
        endTo:""
      },
      paymentsDates:{
        startFrom:"",
        endTo:""
      },

      alerts: [],
      homeData: [],

      series3: [
        {
          name: "",
          data: [],
        },
      ],
      chartOptionsthree: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
        },
        noData: {
          text: "Loading...",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#FF1654", "#247BA0"],

        stroke: {
          width: [4, 4],
        },
        plotOptions: {
          bar: {
            columnWidth: "20%",
          },
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#FF1654",
            },
            labels: {
              style: {
                colors: "#FF1654",
              },
            },
            title: {
              text: "E.G (Pounds)",
              style: {
                color: "#FF1654",
              },
            },
            
          },
          
        ],
        tooltip: {
          
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
      series: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],

      series2: [
        {
          name: "Users",
          data: [],
        },
      ],

      colors: ["#2c4484", "#E91E63"],

      //  546E7A
      //  E91E63

      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        legend: {
          show: false,
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: ["#E91E63", "#2c4484"],
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
            opacity:0,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },

        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        yaxis: {
          title: {
            text: "E.G (Pounds)",
          },
        },
        noData: {
          text: "Loading...",
        },
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: [],
          },
          colors: ["#2c4484", "#E91E63"],
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "E.G " + val + " Pounds";
            },
          },
        },
      },

      chartOptionstwo: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },

        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: "Users",
          },
        },
        noData: {
          text: "Loading...",
        },
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: [],
          },
          colors: ["#2c4484", "#E91E63"],
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " User";
            },
          },
        },
      },
    };
  },
};
</script>

<style lang="scss">
.main-title {
  font-size: 31px;
  padding: 9px 15px 0 15px;
}
.alert-messages {
  border-radius: 30px 30px 30px 0;
  background: #fff;
  position: relative;
  padding: 30px;
  border: 2px solid #2c4484;
  &::after {
    position: absolute;
    bottom: -54px;
    border-width: 1px 63px 55px 66px;
    border-style: solid;
    border-color: transparent transparent transparent #2c4484;
    content: "";
    left: -2px;
  }
  &::before {
    position: absolute;
    bottom: -50px;
    border-width: 3px 129px 51px 62px;
    border-style: solid;
    border-color: transparent transparent transparent white;
    content: "";
    left: 0px;
    z-index: 99;
  }

  ul {
    list-style: none;
    li {
      font-size: 13px;
      margin-bottom: 15px;
      position: relative;

      &:first-of-type {
        &::after {
          background: #f6d9ad;
        }
      }

      &:nth-of-type(2) {
        &::after {
          background: #ffa3ab;
        }
      }

      &:nth-of-type(3) {
        &::after {
          background: #b7bad6;
        }
      }

      &:nth-of-type(4) {
        &::after {
          background: #abe3ce;
        }
      }

      &:last-of-type {
        &::after {
          background: #fce0b9;
        }
      }
      &::after {
        content: " ";
        width: 6px;
        height: 6px;
        left: -14px;
        top: 7px;
        position: absolute;
      }
    }
  }
}

.select-dates{
  display: flex;
  flex-wrap: wrap;

  >div{
    flex:1;
    margin:5px;
    &:last-of-type{
      flex: none;
    padding-top: 31px;
    }
  }



  .select-time{
        border: 2px solid transparent;
    background: rgba(var(--vs-dark), 0.1) !important;
    color: rgba(var(--vs-text), 1);
    padding: 7px 13px;
    border-radius: 15px;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    padding-left: 10px;
    height: 40px;

    border-radius: 8px;
    margin-top: 2px;
    width:100%;
  }

}
</style>
