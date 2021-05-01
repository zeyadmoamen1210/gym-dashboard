<template>
  <div class="container">
      <div class="show-file">
        <div class="header">
          <StarHeader title="Break Sheet" />
        </div>
        <iframe class="iframe" src="https://docs.google.com/document/d/1QT-TtlxVHlbfgzea8C7TA0PHYM74pSGyvjlNnEYoJMc/edit?usp=sharing" frameborder="0"></iframe>
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
    box-shadow: 0 4px 25px 0 #0000001a !important;
  }
}

</style>