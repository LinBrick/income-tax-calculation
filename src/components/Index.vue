<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <count-tax @refreshData="updateDataList"/>
    </el-col>
    <el-col :span="16">
      <tax-details :data-list="dataList"/>
    </el-col>
  </el-row>
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
      dataList: []
    }
  },
  methods: {
    updateDataList(dataList) {
      this.dataList = dataList
    }
  }
}
</script>
