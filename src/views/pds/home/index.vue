<template>
    <div class="pds-container">

        <el-row class="pds-row">
            <el-col :span="24" style="height: 100%">
                <div class="pds-card" style="height: calc(80vh);">
                    <div id="map" style="width: 100%; height: 100%;"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>


    var rateOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };

    export default {
        name: "pdshome",
        data() {
          return {

          }
        },

        mounted() {
            // var rateChart = this.$echarts.init(document.getElementById("rateChart"))
            // rateChart.setOption(rateOption)

            var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
            mapboxgl.accessToken = 'pk.eyJ1IjoibGlnZW5tdCIsImEiOiJjano5bWF2dXgwNWJzM2psa3UyZWNraWhoIn0.D-K8eQB5npFvjrvn-1JiWA';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/ligenmt/ck2hkv7d60w2n1coing910aea',
                center: [-74.50, 40],
                zoom: 2, // starting zoom
            });

            map.on('load', function () {

                map.addLayer({
                    'id': 'maine',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Polygon',
                                'coordinates': [[[-67.13734351262877, 45.137451890638886],
                                    [-66.96466, 44.8097],
                                    [-68.03252, 44.3252],
                                    [-69.06, 43.98],
                                    [-70.11617, 43.68405],
                                    [-70.64573401557249, 43.090083319667144],
                                    [-70.75102474636725, 43.08003225358635],
                                    [-70.79761105007827, 43.21973948828747],
                                    [-70.98176001655037, 43.36789581966826],
                                    [-70.94416541205806, 43.46633942318431],
                                    [-71.08482, 45.3052400000002],
                                    [-70.6600225491012, 45.46022288673396],
                                    [-70.30495378282376, 45.914794623389355],
                                    [-70.00014034695016, 46.69317088478567],
                                    [-69.23708614772835, 47.44777598732787],
                                    [-68.90478084987546, 47.184794623394396],
                                    [-68.23430497910454, 47.35462921812177],
                                    [-67.79035274928509, 47.066248887716995],
                                    [-67.79141211614706, 45.702585354182816],
                                    [-67.13734351262877, 45.137451890638886]]]
                            }
                        }
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.8
                    }
                });

                // var layers = map.getStyle().layers;
                // for (var i = 0; i < layers.length; i++) {
                //     console.log(JSON.stringify(layers[i]))
                // }
                map.on('click', 'testpoints', (e) => {
                    console.log(e)
                })
            });
        },
    }
</script>

<style scoped>
    .pds-container {
        /*background: #eeeeee;*/
        height: 100%;
    }

    .pds-card {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        transition: .3s;
        box-shadow: 0 2px 12px 0 rgba(0,78,126, .1);
        padding: 20px;
        margin: 10px;
    }

    .pds-row {
        width: 100%;
    }
</style>
