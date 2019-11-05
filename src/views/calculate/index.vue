<template>
    <div>
      calculate
      <el-card class="box-card">
        <div id="dataChart" :style="{width: '800px', height: '600px'}"></div>
      </el-card>

    </div>
</template>

<script>

  import {getData} from '../../api/api'

  export default {
        name: "calculate",
        data() {
            return {

            }
        },
        mounted() {
            this.updateChart()
            getData().then(res => {
            })

        },
        methods: {
            updateChart() {
                let dataChart = this.$echarts.init(document.getElementById('dataChart'))
                let option = {
                  xAxis: {
                    type: 'value',
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                    data: [[1,1], [2,2], [4,4], [5,7], [6,10], [8,12], [9,21]],
                    type: 'line',
                    smooth: true
                    },
                    {
                      data: [[1,1], [2,2], [3,3], [4, 3], [5,3], [6,3], [7,3]],
                      type: 'line',
                      smooth: true
                    },
                    {
                      type: 'effectScatter',
                      symbolSize: 10,
                      data: [
                        [2,2],
                        [5,7]
                      ]
                    }
                  ]
                }
                dataChart.setOption(option)
            },
        }
    }
</script>

<style scoped>

</style>
