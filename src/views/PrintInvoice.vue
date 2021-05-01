<template>
  <div class="certificate-preveiw-page">
    <div class="container">
        <div>


      <button class="btn btn-primary" @click="printCertificate"> <i class="fas fa-medal"></i> Download The Invoice </button>

      <div >
        <div class="img-container" id="tablecontainer">
          <img src="@/assets/eisal-estlam.jpg" alt="" />
          <div class="id">
              <h6> {{invoice._id}} </h6>
          </div>
          <div class="user">
              <h6> {{invoice.user[0].username}} </h6>
          </div>
          <div class="indate-d">
              <h6> {{new Date(invoice.dateObligation.date).getDate()}} </h6>
          </div>
          <div class="indate-m">
              <h6> {{new Date(invoice.dateObligation.date).getMonth()}} </h6>
          </div>
          <div class="indate-y">
              <h6> {{new Date(invoice.dateObligation.date).getFullYear()}} </h6>
          </div>
          <div class="amount">
              <h6>{{invoice.dateObligation.amount}} </h6>
          </div>
        </div>
      </div>

      <!-- <img :src="output"> -->


        </div>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";

export default {
    
  data() {
    return {

      output: null,
      isLoading: true,
      invoice:{}
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
    getInvoice() {
     this.invoice = JSON.parse(localStorage.getItem('ReadyToPrint'));
    },
    print() {
      var node = document.getElementById("tablecontainer");
          let loading =  this.$vs.loading();

      domtoimage
        .toPng(node)
        .then((dataUrl) => {
          var img = new Image();
          img.src = dataUrl;
          this.downloadURI(dataUrl, "Invoice.png");
        })
        .catch(()=> {
           loading.close()
            this.$vs.notification({
                title:"Success !",
                text:`Invoice Printed Successfully`,
                color:"success",
                position:"top-center"
            });
        }).finally(() => loading.close());
    },

    
  },
  created() {
    if(localStorage.getItem("ReadyToPrint")){
        this.getInvoice();
    }else{
        this.$router.push(`/`)
    }
 
  }
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
    height: 466px;
    text-align: center;
    margin: auto;
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

    .id, .user, .indate-m, .indate-y, .indate-d, .amount{
        position: absolute;
    }
    .id{
        top: 25%;
        right: 14%;
    }
    .user{
        top: 48%;
        right: 43%;
        font-size: 21px;
    }
    .indate-m{
        top: 39%;
        right: 23%;
    }
    .indate-y{
        top: 39%;
        right: 27%;
    }
    .indate-d{
        top: 39%;
        right: 18%;
    }
    .amount{
        top: 39%;
        left: 15%;
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
  .id, .user, .indate-m, .indate-y, .indate-d, .amount{
        h6{
            font-size: 8px !important;
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

  .id, .user, .indate-m, .indate-y, .indate-d, .amount{
        h6{
            font-size: 10px !important;
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
