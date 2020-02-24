<template>
    <div>
        <div class="box">
            <section class="inner"></section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "flexcenter",

        data() {
            return {
            }
        },

        methods: {

        },
    }
</script>

<style scoped>
    .box {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        width: 1000px;
        height: 600px;
        border: 1px solid red;
    }
    .inner {
        width: 300px;
        height: 200px;
        background-color: red;
    }

</style>
