<template>
    <canvas id="canvasHotmapd2" style="border: 1px solid #aaaaaa; display: block; margin: 50px auto; width: 800px; height: 400px">
        你的浏览器居然不支持Canvas？！赶快换一个吧！！
    </canvas>
</template>

<script>
    export default {
        name: "hotmapd1",
        data() {
            return {
                gammalist: [],
                nums: 8,
            }
        },

        created() {
            for(var i=0;i<150;i++){
                var temp=[]
                for(var j=0;j<this.nums;j++){
                    temp.push((Math.random()*500).toFixed(1)-0)
                }
                temp.push(temp[0])
                this.gammalist.push(temp)
            }
        },

        mounted() {

            let temp = this.heatMap_interpolation(this.gammalist)
            // console.log(temp)
            let data = []
            let xData = []
            let yData = []
            for (var i = 0; i < temp.length; i++) {
                var gammaTemp=[]
                for (var j = 0; j < temp[0].length; j++) {
                    gammaTemp.push(temp[i][j]);
                }
                data.push(gammaTemp)
            }
            //最后一行放第一行的值
            var gammaTemp=[]
            for (var j = 0; j < temp[0].length; j++) {
                gammaTemp.push(temp[0][j]);
            }
            data.push(gammaTemp)

            let canvas = document.getElementById("canvasHotmapd2");
            let ctx = canvas.getContext("2d");
            canvas.width=canvas.offsetWidth
            canvas.height=canvas.offsetHeight
            // canvas.width= 800
            // canvas.height= 400
            let ho = canvas.height/data[0].length
            let vo = canvas.width/data.length;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[0].length; j++) {
                    ctx.save()
                    ctx.beginPath();
                    ctx.rect(vo*i,ho*j,vo,ho);
                    ctx.fillStyle=this.getColorFromValue(500,data[i][j]);//500为伽马的范围最大值
                    ctx.fill();
                    // ctx.closePath();
                    ctx.restore()
                }
            }
        },

        methods: {
            heatMap_interpolation(list){
                let reslist = []
                //Y轴的方向插值(gamma值)
                for(let mm=0;mm<list.length;mm++){
                    reslist.push(this.getY_interpolation(list[mm],10))
                }
                //X轴的方向插值后得到最终二维数组(井深)
                let templist = []
                for(let nn=1;nn<reslist.length;nn++){
                    templist.push(this.getX_interpolation(reslist[nn-1],reslist[nn],10))
                }
                // console.log(templist)
                reslist = []
                let sizea = templist[0].length
                let sizeb = templist[0][0].length
                // console.log(sizea,sizeb)
                let aa = 0
                let bb = 0
                // console.log(templist.length)
                for(let kk=0;kk<templist.length;kk++){
                    bb = 0
                    while(bb!=sizeb){
                        let temp = []
                        for(aa=0;aa<templist[kk].length;aa++){
                            temp.push(templist[kk][aa][bb])
                        }
                        reslist.push(temp)
                        bb = bb+1
                    }
                }
                // console.log(reslist,"bbbbbbbbb")
                return reslist
            },

            //纵坐标方位插值
            getY_interpolation(listY,n) {
                let res = []
                for(let i=0;i<listY.length-1;i++){
                    let temp = this.getInterpolation(listY[i],listY[i+1],n)
                    for(let j=0;j<temp.length;j++){
                        res.push(temp[j])
                    }
                }
                res.push(listY[listY.length-1])
                return res
            },

            //横坐标井深插值
            getX_interpolation(list_from,list_to,n){

                let res = []
                let size = list_from.length
                for(let i=0;i<size;i++){
                    let temp = this.getInterpolation(list_from[i],list_to[i],n)
                    res.push(temp)
                }
                return res
            },

            //插n个值
            getInterpolation(from,to,n){
                let res = []
                let diff = (from-to)/n
                for(let i=0;i<n;i++){
                    res.push(from-i*diff)
                }
                return res
            },

            //通过值获取16进制颜色
            getColorFromValue(max,value){
                let a,b,k
                //0---a---b---max  范围示例
                //value为输入真实值,min和max分别为指定区间最大最小值,譬如a--b区间a为min,b为max
                //rgb1[i]与rgb2[i]分别为指定区间rgb分量,譬如a--b区间rgb1[i]为#fbd924，rgb2[i]为#e45e1c
                /*
                    value - min
                  ---------------  * (rgb1[i]-rgb2[i])
                    max - min
                */
                k = max/3
                a = Math.round(k)
                b = Math.round(2*k)
                // console.log(0,a,b,max)
                let percent = 0
                let red = 0
                let green = 0
                let blue = 0
                if(value<=a){ //0---a
                    // console.log('#FFFFFF','#fbd924')
                    percent = (value - 0)/(a - 0)
                    red = 255-251
                    green = 255-217
                    blue = 255-36
                    return this.getAvag(255-percent*red,255-percent*green,255-percent*blue)
                }else if(value>a&&value<=b){ //a---b
                    // console.log('#fbd924','#e45e1c')
                    percent = (value - a)/(b - a)
                    red = 251-228
                    green = 217-94
                    blue = 36-28
                    return this.getAvag(251-percent*red,217-percent*green,36-percent*blue)
                }else{  //b---c
                    // console.log('#e45e1c','#000000')
                    percent = (value - b)/(max - b)
                    red = 228
                    green = 94
                    blue = 28
                    return this.getAvag(228-percent*red,94-percent*green,28-percent*blue)
                }

            },

            //组合变成(r,g,b)格式
            getAvag(r,g,b){
                // console.log(r,g,b)
                let temp = "("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+")"
                return this.colorRGBtoHex(temp)
            },
            //RGB颜色转换为16进制颜色
            colorRGBtoHex(color) {
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]);
                var g = parseInt(rgb[1]);
                var b = parseInt(rgb[2].split(')')[0]);
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            },
        },
    }
</script>

<style scoped>

</style>
