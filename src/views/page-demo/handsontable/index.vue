<template>
    <hot-table :data="data" rowHeaders="true" colHeaders="true" licenseKey="non-commercial-and-evaluation"></hot-table>
</template>

<script>
    import { HotTable } from '@handsontable/vue';
    export default {
        name: "handsontable",
        data() {
            return {
                data: [
                    ["", "Ford", "Volvo", "Toyota", "Honda"],
                    ["2016", 10, 11, 12, 13],
                    ["2017", 20, 11, 14, 13],
                    ["2018", 30, 15, 12, 13]
                ],
            };
        },
        components: {
            HotTable
        },

    }
</script>

<style src="../../../../node_modules/handsontable/dist/handsontable.full.css">

</style>
