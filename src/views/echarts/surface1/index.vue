<template>
  <div id="surface1Chart" ref="surface1Chart" style="width: 100%; height: 800px;"></div>
</template>

<script>

    export default {
        name: "surface1",
        data() {
            return {}
        },
        mounted() {
            let myChart = this.$echarts.init(document.getElementById('surface1Chart'))
            var sin = Math.sin;
            var cos = Math.cos;
            var pow = Math.pow;
            var sqrt = Math.sqrt;
            var cosh = Math.cosh;
            var sinh = Math.sinh;
            var PI = Math.PI;

            var aa = 0.4;
            var r = 1 - aa * aa;
            var w = sqrt(r);
            var option = {
                tooltip: {},
                visualMap: {
                    show: false,
                    dimension: 2,
                    min: -1,
                    max: 1,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    }
                },
                xAxis3D: {},
                yAxis3D: {},
                zAxis3D: {},
                grid3D: {},
                series: [{
                    type: 'surface',
                    parametric: true,
                    // shading: 'albedo',
                    parametricEquation: {
                        u: {
                            min: -Math.PI,
                            max: Math.PI,
                            step: Math.PI / 20
                        },
                        v: {
                            min: 0,
                            max: Math.PI,
                            step: Math.PI / 20
                        },
                        x: function (u, v) {
                            return Math.sin(v) * Math.sin(u);
                        },
                        y: function (u, v) {
                            return Math.sin(v) * Math.cos(u);
                        },
                        z: function (u, v) {
                            return Math.cos(v);
                        }
                    }
                }]
            };
            myChart.setOption(option);
        },
    }
</script>

<style scoped>
    .background {
        color: #ff3300;
    }
</style>
