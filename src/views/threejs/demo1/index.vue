<template>
  <div id="canvasDemo1" ref="canvasDemo1" style="width: 100%; height: 600px; cursor: pointer;"></div>
</template>

<script>

    import * as THREE from "three";
    import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    import {DDSLoader} from "three/examples/jsm/loaders/DDSLoader";
    import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
    import { AmbientLight, LightShadow } from "three";
    const OrbitControls = require("three-orbit-controls")(THREE);

    export default {
        name: "demo1",
        data() {
            return {
                scene: null,
                camera: null,
                renderer: null,
            }
        },
        mounted() {
            this.init();
            this.loadObj();
            this.light();
            this.animate();
        },

        methods: {
            // 初始化场景
            init() {
                let container = document.getElementById("canvasDemo1");
                /*
                  场景
                */
                this.scene = new THREE.Scene();
                /*
                  相机
                */
                this.camera = new THREE.PerspectiveCamera(
                    30,
                    container.clientWidth / container.clientHeight,
                    1,
                    1000
                );
                this.camera.position.z = 50;
                /*
                    渲染器
                  */
                this.renderer = new THREE.WebGLRenderer({ antialias: true });
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                this.renderer.setClearColor(0xffffff, 1);
                container.appendChild(this.renderer.domElement);
                new OrbitControls(this.camera, this.renderer.domElement);
            },
            // 加载模型
            loadObj() {
                let manager = new THREE.LoadingManager();
                manager.addHandler( /\.dds$/i, new DDSLoader());
                new MTLLoader(manager)
                    .setPath("/static/")
                    .load("Slide48.mtl", (materials) => {
                        console.log(manager);
                        materials.preload();
                        new OBJLoader(manager)
                            .setMaterials(materials)
                            .load("/static/Slide48.obj", (obj) => {
                                console.log(obj.children[0].material);
                                obj.scale.set(0.09, 0.09, 0.09);
                                obj.position.set(0, -7, 0);
                                this.scene.add(obj);
                            });
                    });
                // new GLTFLoader().load("/model/Duck/Duck.gltf", (obj) => {
                //   console.log(obj);
                //   this.scene.add(obj.scene);
                //   obj.scene.scale.set(5, 5, 5);
                // });
            },
            // 灯光效果
            light() {
                //添加聚光灯光源
                /*       let light = new THREE.SpotLight(0xffffff);
                light.position.set(-40, 60, -10);
                light.castShadow = true;
                light.shadow.mapSize.width = 2048;
                light.shadow.mapSize.height = 2048; */
                let light = new THREE.DirectionalLight(0xdfebff, 0.45); //从正上方（不是位置）照射过来的平行光，0.45的强度
                light.position.set(50, 200, 100);
                light.position.multiplyScalar(0.3);
                this.scene.add(light);
                //添加环境光
                let ambientLight = new THREE.AmbientLight("#ffffff");
                this.scene.add(ambientLight);
            },
            // 动画效果
            animate() {
                requestAnimationFrame(this.animate);
                this.renderer.render(this.scene, this.camera);
            },
        },
    }
</script>

<style scoped>
    .test {
        background: #b9d3ff;
    }
</style>
