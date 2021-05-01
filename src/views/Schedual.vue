<template>
  <div class="schedule-page">
    <div class="container">
        <div class="schedule-header">
            <StarHeader title="Sessions" />
        </div>

        <div class="schedule-head">
            <div>
                <datetime style="width:100%" hidden-name="Strat Date" title="Start Date" input-class="select-time" v-model="date" type="date"></datetime>
            </div>
            <!-- <div>
                <vs-button> Sessions </vs-button>
            </div> -->
        </div>


        <div class="row">
            <div class="col-md-4" v-for="session in currSesstions" :key="session._id">
                <SessionCard :session="session" />
            </div>
        </div>
        
        
    </div>
  </div>
</template>

<script>
import axiosApi from '@/plugins/axios.js'
import StarHeader from '@/components/StarHeader'
import SessionCard from '@/components/SessionCard'
export default {
    components:{
        StarHeader,
        SessionCard
    },
    data(){
        return {
            date:"",
            currSesstions: [],
        }
    },
    watch:{
        date(){
            this.getSesstions();
        }
    },
    created(){
        this.date = new Date().toISOString()
        console.log(this.date)
        this.getSesstions();
    },
    methods:{
        getSesstions(){
            let loading = this.$vs.loading();
            
            axiosApi.post(`/getDaySessions`, {
                date: this.$moment.utc(this.date).subtract(2,'h').format(),
                day: this.$moment(this.date).format('D')
            }).then(res => {
                this.currSesstions = res.data;
            }).finally(() => loading.close())
        }
    }
}
</script>

<style lang="scss">


.schedule-page{
    .schedule-header{
    margin-bottom: 5px;
}
.schedule-head{
    display: flex;
    
    >div{
        &:first-of-type{
            flex: 1;
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

}

</style>