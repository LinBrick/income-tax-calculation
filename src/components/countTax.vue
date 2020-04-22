<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="100px">
    <el-form-item label="税前工资" prop="grossSalary">
      <el-input v-model.number="form.grossSalary" maxlength="12">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="五险一金" prop="insurancesPrice">
      <el-input v-model.number="form.insurancesPrice" maxlength="10">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="专项扣除" prop="specialDeduction">
      <el-input v-model.number="form.specialDeduction" maxlength="10">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="起征点">
      <el-input v-model.number="form.threshold" disabled>
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="build">生成一年</el-button>
      <el-button type="primary" @click="onSubmit">单月创建</el-button>
      <el-button @click="resetFormData">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        grossSalary: 2000, // 税前工资
        insurancesPrice: 0, // 五险一金
        specialDeduction: 0, // 专项扣除
        threshold: 5000, // 起征点
        // fixed: true,
        dataList: []
      },
      rules: {
        grossSalary: [
          { required: true, message: '必填项', trigger: 'change' },
          { type: 'number', message: '必须为数字值', trigger: 'change' }
        ],
        insurancesPrice: [
          { required: true, message: '必填项', trigger: 'change' },
          { type: 'number', message: '必须为数字值', trigger: 'change' }
        ],
        specialDeduction: [
          { required: true, message: '必填项', trigger: 'change' },
          { type: 'number', message: '必须为数字值', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'form.dataList'(dataList) {
      this.$emit('refreshData', dataList)
    }
  },
  methods: {
    // 一键生成
    build() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.dataList = []
          for (let i = 1; i <= 12; i++) {
            this.perform()
          }
        }
      })
    },
    // 单月记录创建
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.dataList.length === 12) {
            this.$message({
              message: '不能超过12条记录',
              type: 'warning'
            })
            return
          }
          this.perform()
        }
      })
    },
    // 执行计算结果
    perform() {
      const length = this.form.dataList.length
      if (length === 0) {
        const freeAmount = this.form.insurancesPrice + this.form.specialDeduction + this.form.threshold// 免额(五险+专项+起征点)
        const difference = this.form.grossSalary - freeAmount// 差额
        const taxAmount = difference > 0 ? difference : 0// 缴纳金额
        const tax = difference > 0 ? this.calculationTax(taxAmount) : 0// 个税
        this.form.dataList.push({
          index: '1月份',
          grossSalary: this.form.grossSalary, // 税前
          insurancesPrice: this.form.insurancesPrice, // 五险一金
          specialDeduction: this.form.specialDeduction, // 专项扣除
          threshold: this.form.threshold, // 起征点
          taxAmount: taxAmount, // 缴纳金额
          tax: tax > 0 ? tax : 0, // 个税
          afterTax: this.form.grossSalary - this.form.insurancesPrice - tax// 税后(税前-五险-个税)
        })
      } else {
        const totalGrossSalary = this.getValueTotal('grossSalary', this.form.grossSalary)// 总计税前
        const totalInsurancesPrice = this.getValueTotal('insurancesPrice', this.form.insurancesPrice)// 总计五险一金
        const totalSpecialDeduction = this.getValueTotal('specialDeduction', this.form.specialDeduction)// 总计专项扣除
        const totalThreshold = this.getValueTotal('threshold', this.form.threshold)// 总计起征点
        const totalFreeAmount = totalInsurancesPrice + totalSpecialDeduction + totalThreshold// 免额(五险+专项+起征点)
        const totalDifference = totalGrossSalary - totalFreeAmount// 差额
        const totalTaxAmount = totalDifference > 0 ? totalDifference : 0// 缴纳金额
        const totalTax = totalDifference > 0 ? this.calculationTax(totalTaxAmount) : 0// 个税
        const currentTax = totalTax - this.getValueTotal('tax')// 减去今年内已交的税
        this.form.dataList.push({
          index: (length + 1) + '月份',
          grossSalary: this.form.grossSalary,
          insurancesPrice: this.form.insurancesPrice,
          specialDeduction: this.form.specialDeduction,
          threshold: this.form.threshold,
          taxAmount: totalTaxAmount,
          tax: currentTax > 0 ? currentTax : 0,
          afterTax: this.form.grossSalary - this.form.insurancesPrice - currentTax
        })
      }
    },
    // 计算个税
    calculationTax(num) {
      switch (true) {
        case num >= 36000 && num < 144000:
          return num * 0.1 - 2520
        case num >= 144000 && num < 300000:
          return num * 0.2 - 16920
        case num >= 300000 && num < 420000:
          return num * 0.25 - 31920
        case num >= 420000 && num < 660000:
          return num * 0.3 - 52920
        case num >= 660000 && num < 960000:
          return num * 0.35 - 85920
        case num >= 960000:
          return num * 0.45 - 181920
        default:
          return num * 0.03
      }
    },
    // 获取某一项的总数
    getValueTotal(key, num = 0) {
      let total = 0
      this.form.dataList.forEach(data => {
        total += data[key]
      })
      return total + num
    },
    // 重置
    resetFormData(param) {
      this.form.dataList = []
    }
  }
}
</script>
