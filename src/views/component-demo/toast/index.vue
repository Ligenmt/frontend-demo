<template>
    <div>
        <el-button @click="click">Toast</el-button>
    </div>
</template>

<script>
    export default {
        name: "toastdemo",

        methods: {
            click() {
                let t = this.$toast({
                    text: '我是消息',
                    type: 'warning',
                    duration: 3000,
                })
                setTimeout(() => {
                    t.close()
                }, 1000)
            },
        },
    }

</script>

<style scoped>

</style>
