<template>
  <div class="container">
      <div class="show-file">
        <div class="header">
          <StarHeader title="Classes Attendance" />
        </div>
        <iframe class="iframe" src="https://docs.google.com/document/d/1eJjXne_BxHnEcVmy7z04RdoXB1X6_sdXL4Tzmt967_M/edit?usp=sharing" frameborder="0"></iframe>
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