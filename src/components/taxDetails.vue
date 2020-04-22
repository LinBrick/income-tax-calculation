<template>
  <el-table :data="dataList" :summary-method="getSummaries" border show-summary style="width: 100%">
    <el-table-column prop="index" label="月份" fixed="left"/>
    <el-table-column label="税前工资" prop="grossSalary">
      <template slot-scope="scope">
        {{ scope.row.grossSalary.toFixed(2) }}元
      </template>
    </el-table-column>
    <el-table-column label="五险一金" prop="insurancesPrice">
      <template slot-scope="scope">
        {{ scope.row.insurancesPrice.toFixed(2) }}元
      </template>
    </el-table-column>
    <el-table-column label="专项扣除" prop="specialDeduction">
      <template slot-scope="scope">
        {{ scope.row.specialDeduction.toFixed(2) }}元
      </template>
    </el-table-column>
    <el-table-column label="最终个税" prop="tax" fixed="right">
      <template slot-scope="scope">
        {{ scope.row.tax.toFixed(2) }}元
      </template>
    </el-table-column>
    <el-table-column label="税后工资" prop="afterTax" fixed="right">
      <template slot-scope="scope">
        {{ scope.row.afterTax.toFixed(2) }}元
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
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
          sums[index] = (sums[index]).toFixed(2)
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
