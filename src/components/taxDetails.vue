<template>
  <el-table :data="dataList" :summary-method="getSummaries" border show-summary style="width: 100%">
    <el-table-column prop="index" label="月份" fixed="left"/>
    <el-table-column label="税前工资" prop="grossSalary">
      <template slot-scope="scope">
        {{ scope.row.grossSalary | numberToFixed }}元
      </template>
    </el-table-column>
    <el-table-column v-if="!isMobileWidth" label="五险一金" prop="insurancesPrice">
      <template slot-scope="scope">
        {{ scope.row.insurancesPrice | numberToFixed }}元
      </template>
    </el-table-column>
    <el-table-column v-if="!isMobileWidth" label="专项扣除" prop="specialDeduction">
      <template slot-scope="scope">
        {{ scope.row.specialDeduction | numberToFixed }}元
      </template>
    </el-table-column>
    <el-table-column label="最终个税" prop="tax">
      <template slot-scope="scope">
        {{ scope.row.tax | numberToFixed }}元
      </template>
    </el-table-column>
    <el-table-column label="税后工资" prop="afterTax" fixed="right">
      <template slot-scope="scope">
        {{ scope.row.afterTax | numberToFixed }}元
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  filters: {
    numberToFixed(value, digit = 2) {
      if (value < 0) value = 0
      const result = value.toFixed(digit)
      return result.replace('.00', '')
    }
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    isMobileWidth: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取统计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = (sums[index]).toFixed(2).replace('.00', '')
          sums[index] += ' 元'
        } else {
          sums[index] = '--'
        }
      })

      return sums
    }
  }
}
</script>
