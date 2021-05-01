<template>
  <div class="container">
      <div class="show-file">
        <div class="header">
          <StarHeader title="Main Price List" />
        </div>
        <iframe class="iframe" src="https://docs.google.com/document/d/1ztnNtlxMNXfjjMM0AYlRe4FuNkupuzrJx_gXcC8DlWc/edit?usp=sharing" frameborder="0"></iframe>
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