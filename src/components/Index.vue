<template>
  <div class="box">
    <div class="box-count">
      <count-tax :win-width="winWidth" :is-mobile-width="isMobileWidth" @refreshData="updateDataList"/>
    </div>
    <div class="box-details">
      <tax-details :data-list="dataList" :is-mobile-width="isMobileWidth"/>
    </div>
  </div>
</template>
<script>
import CountTax from './countTax'
import TaxDetails from './taxDetails'

export default {
  components: {
    CountTax,
    TaxDetails
  },
  data() {
    return {
      dataList: [],
      winWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
  },
  computed: {
    isMobileWidth() {
      return this.winWidth <= 720
    }
  },
  mounted() {
    // 监听窗口大小改变
    window.addEventListener('resize', () => {
      this.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })
  },
  methods: {
    updateDataList(dataList) {
      this.dataList = dataList
    }
  }
}
</script>

<style scoped>
.box{
    margin: 0 auto;
}
@media screen and (min-width: 1400px) {
  .box .box-count{
    float: left;
    width: 30%;
  }
  .box .box-details{
    float: left;
    margin-left: 3%;
    width: 67%;
  }
}

@media screen and (min-width: 1100px) and (max-width: 1400px) {
  .box .box-count{
    float: left;
    width: 40%;
  }
  .box .box-details{
    float: left;
    margin-left: 3%;
    width: 57%;
  }
}

@media screen and (min-width: 720px) and (max-width: 1100px){
  .box .box-count{
    display: block;
  }
  .box .box-details{
    display: block;
  }
}

@media screen and (max-width: 720px){
  .box .box-count{
    display: block;
  }
  .box .box-details{
    display: block;
  }
  .box .box-details .el-table{
    font-size: 12px;
  }
}

</style>
