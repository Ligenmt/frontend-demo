<template>
    <div>
        <div id="well-structure" style="width: 600px; height: 560px; border: solid black 1px; margin: 20px;"></div>
    </div>
</template>

<script>
    import {traList, caseList, tubeList, perforList} from './data'
    import {WellStructure, createRenderObj} from "./WellStructure"
    export default {
        name: "wellstructure",

        data() {
            return {
                colSpan: {
                    left: 24,
                    right: 0
                }
            }
        },

        mounted() {

            this.wellStructureSet = {
                showBackground: false,
                fluidColor: "#80FF80",
                caseColor: "#36282b",
                tubeColor: "#36282b",
                perforationColor: "#ff0000",
                bpmdColor: "#002FA7"
            };
            this.wellStructureConfirm = {...this.wellStructureSet};
            this.renderWellStructure()
        },

        methods: {
            renderWellStructure() {
                this.tubeArr = tubeList
                this.perforationArr = perforList
                this.caseArr = caseList
                this.trackArr = traList

                // 比较射孔底深和油管谁长
                let isTubeLonger = false;
                let maxTubeDepth = this.tubeArr.length > 0 ? this.tubeArr[this.tubeArr.length - 1].tubingDepth : 0;
                let maxPerforation = this.perforationArr.length > 0 ? this.perforationArr[this.perforationArr.length - 1].bottomDepth : 0;
                isTubeLonger = maxTubeDepth > maxPerforation;
                //射孔中部深度
                let bpMd = 0;
                let fluidPassageway = "CASING";


                if (this.caseArr.length > 0) {
                    this.colSpan.left = 17;
                    this.colSpan.right = 7;
                }

                let wellStructure = new WellStructure("well-structure");
                wellStructure.init(this.caseArr, this.trackArr, this.tubeArr, this.perforationArr, bpMd);
                wellStructure.render(this.setRenderOption(fluidPassageway, isTubeLonger));
            },

            setRenderOption(type, isTubeLonger) {
                // 根据流体通道（type）设置图层
                let set = {...this.wellStructureConfirm};
                let option = {};
                option.showBackground = set.showBackground;
                option.data = [];
                switch (type) {
                    case "CASING":
                        // 套管
                        option.data.push(createRenderObj("Case", set.caseColor, false, set.fluidColor, 0));
                        option.data.push(createRenderObj("CasePerforation", set.caseColor, true, set.fluidColor, 1));
                        break;
                    case "TUBING":
                        // 油管
                        if (isTubeLonger) {
                            option.data.push(createRenderObj("Case", set.caseColor, false, set.fluidColor, 0));
                            option.data.push(createRenderObj("CasePerforation", set.caseColor, true, set.fluidColor, 1));
                            option.data.push(createRenderObj("CaseTube", set.caseColor, false, set.fluidColor, 2));
                            option.data.push(createRenderObj("TubeOut", set.tubeColor, true, set.fluidColor, 3));
                            option.data.push(createRenderObj("TubeIn", set.tubeColor, true, set.fluidColor, 4));
                        } else {
                            option.data.push(createRenderObj("Case", set.caseColor, false, set.fluidColor, 0));
                            option.data.push(createRenderObj("TubeOut", set.tubeColor, false, set.fluidColor, 1));
                            option.data.push(createRenderObj("TubeIn", set.tubeColor, false, set.fluidColor, 2));
                            option.data.push(createRenderObj("TubePerforationOut", set.tubeColor, true, set.fluidColor, 3));
                            option.data.push(createRenderObj("TubePerforationIn", set.tubeColor, true, set.fluidColor, 4));
                        }
                        break;
                    case "ANNULARGAP":
                        // 环空
                        option.data.push(createRenderObj("Case", set.caseColor, false, set.fluidColor, 0));
                        option.data.push(createRenderObj("CasePerforation", set.caseColor, true, set.fluidColor, 1));
                        option.data.push(createRenderObj("TubeOut", set.tubeColor, true, "#fff", 2));
                        option.data.push(createRenderObj("TubeIn", set.tubeColor, true, "#fff", 3));
                        break;
                    default:
                        break;
                }
                option.data.push(createRenderObj("Perforation", set.perforationColor, true, set.perforationColor, 10));
                option.data.push(createRenderObj("BpMd", set.bpmdColor, false, set.fluidColor, 11));
                return option;
            }
        },
    }
</script>

<style scoped>

</style>
