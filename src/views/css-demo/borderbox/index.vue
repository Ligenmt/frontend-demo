<template>
    <div>
        <!-- 标准盒模型 -->
        <div>标准盒模型中，width 和 height 属性所指定的宽高就是实际内容区的大小，而盒子实际大小是：width + padding + border</div>
        <div>
            <div class="content-box">
                我是content-box
            </div>
            <div class="content-box">
                我是content-box
            </div>
            <div class="content-box">
                我是content-box
            </div>
            <div class="content-box">
                我是content-box
            </div>

        </div>
        <!-- 怪异盒模型 -->
        <div>width 和 height 做指定的宽高就是盒子的实际宽高，而它内容区部分的大小是在 width 或 height 指定
            尺寸的基础上，再减去 border 和 padding 所占的宽度。这种模式下只要设置了width 和height，那么这个
            盒子的尺寸就是可控的了，不会因为设置 border 或者 panding 造成页面错乱。</div>
        <div>
            <div class="border-box">
                我是border-box
            </div>
            <div class="border-box">
                我是border-box
            </div>
            <div class="border-box">
                我是border-box
            </div>
            <div class="border-box">
                我是border-box
            </div>
            <div style="clear: both"></div>
        </div>
        <div>
            <div style="margin-bottom: 20px;">外边距折叠:20px</div>
            <div style="margin-top: 10px;">外边距折叠:10px</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    div{

    }
    .content-box{
        box-sizing: content-box;
        display: inline-block;
        width: 25%;
        height: 100px;
        padding: 10px;
        border: 1px solid #000;
        margin: 20px;
    }
    .border-box{
        box-sizing: border-box;
        float: left;
        width: 25%;
        height: 100px;
        padding: 10px;
        border: 1px solid #000;
    }
</style>
