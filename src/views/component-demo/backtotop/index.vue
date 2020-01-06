<template>
    <div>
        <div class="placeholder-container">
            <siv>title</siv>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
            <div>placeholder</div>
        </div>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
        </el-tooltip>
    </div>
</template>

<script>
    import BackToTop from '@/components/BackToTop/index'

    export default {
        name: "backtotop",
        components: { BackToTop },
        data() {
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
                    background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
                }
            }
        },
    }
</script>

<style scoped>

</style>
