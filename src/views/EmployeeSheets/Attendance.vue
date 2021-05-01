<template>
  <div class="container">
      <div class="show-file">
        <div class="header">
          <StarHeader title="Attendance" />
        </div>
        <iframe class="iframe" src="https://docs.google.com/spreadsheets/d/1hCRCnni9FOBMzwuFNXqQm_-XmBz0hvnpVZBaTfrwHNs/edit?usp=sharing" frameborder="0"></iframe>
      </div>
  </div>
</template>

<script>
import StarHeader from '@/components/StarHeader';
export default {
  components:{
    StarHeader
  }
}
</script>

<style lang="scss">
.show-file{
  margin-top: 14px;
  .header{
    margin-bottom: 10px;
  }
  .iframe{
    border: 1px solid #2c4484;
    width: 100%;
    height: 800px;
    padding: 15px;
    
  }
}

</style>