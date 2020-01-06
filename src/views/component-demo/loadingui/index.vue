<template>
    <div>
        <el-button @click="clickAuto">ShowLoadingUIAuto</el-button>
        <el-button @click="click">ShowLoadingUI</el-button>
    </div>
</template>

<script>
    export default {
        name: "loadinguidemo",

        methods: {
            clickAuto() {
                let loadingui = this.$loadingui({
                    type: 'auto',
                    callback: () =>{
                        console.log("finish")
                    },
                })
                setTimeout(() => {
                    loadingui.close()
                }, 2000)
            },

            click() {
                let loadingui = this.$loadingui({
                    type: 'default',
                    callback: () =>{
                        console.log("finish")
                    },
                })
                let percent = 0
                let obj = setInterval(()=>{
                    percent += 2
                    loadingui.loadPercent = percent
                    if (percent >= 100) {
                        loadingui.close()
                        clearInterval(obj)
                    }
                }, 50)
            },
        },
    }

</script>

<style scoped>

</style>
