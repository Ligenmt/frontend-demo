<template>
    <canvas id="canvasHotmapd1" style="border: 1px solid #aaaaaa; display: block; margin: 50px auto;">
        你的浏览器居然不支持Canvas？！赶快换一个吧！！
    </canvas>
</template>

<script>
    export default {
        name: "hotmapd1",

        mounted() {

            let colors = ['#F9D84D','#F09A29','#DF571F','#9B3422','#000000']
            let diff = 1/(colors.length-1)
            let canvas = document.getElementById("canvasHotmapd1");
            let ctx = canvas.getContext("2d");
            let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

            for(let i=0;i<colors.length;i++){
                gradient.addColorStop(i*diff,colors[i]);
            }
            // 设置填充样式为渐变
            ctx.fillStyle = gradient;
            ctx.rect(0,0,canvas.width,canvas.height);
            ctx.fill();
        }
    }
</script>

<style scoped>

</style>
