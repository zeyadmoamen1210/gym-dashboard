<template>
  <div class="certificate-preveiw-page">
    <div class="container">
        <div >

      <div style="display:flex;flex-wrap:wrap;margin-bottom: 17px;">
        <div style="flex:1">
          <StarHeader title="Receipt Of Cash" />
        </div>
        <div>
          <vs-button color="#2c4484"  @click="printCertificate"> Download </vs-button>
        </div>
      </div>

      

      <div >
        <div class="img-container" >
          <img id="tablecontainer" src="@/assets/eisal-estlam-nakdia.png" alt="" />
        </div>
      </div>

      <!-- <img :src="output"> -->


        </div>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import StarHeader from '@/components/StarHeader';
export default {
   components:{
     StarHeader
   },
  data() {
    return {
      
      output: null,
      isLoading: true,
    };
  },
  methods: {
    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    printCertificate() {
      this.print();
    },
    
    print() {
      var node = document.getElementById("tablecontainer");
      const loading = this.$vs.loading();

      domtoimage
        .toPng(node)
        .then((dataUrl) => {
          var img = new Image();
          img.src = dataUrl;
          this.downloadURI(dataUrl, "إيصال-استلام-نقدية.png");
        })
        .catch(()=> {
          loading.close()
          this.$vs.notify({title: this.$store.state.isRTL ? 'Oops' : 'خطأ' , text: this.$store.state.isRTL ? 'حدث خطأ ما حاول مرة اخري' : 'There Are Something Wrong', color: 'danger', position: 'top-center'});
        }).finally(() => loading.close());
    },

  },

};
</script>

<style lang="scss">
.certificate-preveiw-page {
  padding-top: 20px;

  .head {
    padding: 15px;
    background: #f7f7f7;
    border-bottom: 3px solid #0a80c3;
    margin-bottom: 25px;
  }
  .img-container {
    position: relative;
    height: auto;
    text-align: center;
    max-width: 70%;
    margin: auto;
    padding-bottom: 25px;
    img {
      height: 100%;
      width: 100%;
    }
    .certificated-at {
      position: absolute;
      bottom: 8%;
      right: 29%;
    }
    .course-name {
      position: absolute;
      top: 72%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .my-name {
      position: absolute;
      position: absolute;
      top: 56%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
}

@media (max-width: 575.98px) {
  .certificate-preveiw-page {
    .img-container {
      position: relative !important;
      height: auto !important;
      text-align: center !important;
      max-width: 100% !important;
      margin: auto !important;
    }
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) {
  .certificate-preveiw-page {
    .img-container {
      position: relative !important;
      height: auto !important;
      text-align: center !important;
      max-width: 100% !important;
      margin: auto !important;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>
