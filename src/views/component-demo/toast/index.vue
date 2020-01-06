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
                this.$toast({
                    text: '我是消息',
                    type: 'warning',
                    duration: 5000,
                })
            },
        },
    }

</script>

<style scoped>

</style>
