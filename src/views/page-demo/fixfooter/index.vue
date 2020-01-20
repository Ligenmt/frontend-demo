<template>
    <div>
        <div class="content">
            <h1>Sticky Footer with Negative Margin 1</h1>
            <p><button @click="add">Add Content</button></p>
            <div class="push">
                <p v-for="data, index in content" :key="index">
                    {{data}}
                </p>
            </div>
        </div>

        <footer class="footer">
            Footer
        </footer>
    </div>
</template>

<script>
    export default {
        name: "fixfooter",

        data() {
            return {
                content: ['Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.'],
            }
        },

        methods: {
            add() {
                this.content.push('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.')
            },
        },
    }
</script>

<style scoped>
    .content {
        padding: 20px;
        min-height: 100%;
        margin: 0 auto -50px;
    }
    .footer,
    .push {
        height: 50px;
    }

</style>
