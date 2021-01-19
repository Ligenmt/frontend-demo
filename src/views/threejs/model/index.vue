<template>
  <div id="modelContainer" ref="modelContainer" style="width: 100%; height: 400px;"></div>
</template>

<script>

    import * as THREE from "three";
    import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    import {DDSLoader} from "three/examples/jsm/loaders/DDSLoader";
    import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
    import { AmbientLight, LightShadow } from "three";
    import OrbitControls from 'three-orbitcontrols'
    export default {
        name: "model",
        data() {
            return {
                container: null,
                windowHalfX: null,
                windowHalfY: null,
                object: null,
                mouseX: 0,
                mouseY: 0,
            }
        },
        mounted() {

            this.init();
            this.light()
        },

        methods: {
            init() {

                this.windowHalfX = window.innerWidth / 2;
                this.windowHalfY = window.innerHeight / 2;

                let container = document.getElementById("modelContainer");
                let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
                camera.position.z = 250;

                // scene

                let scene = new THREE.Scene();

                const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
                scene.add( ambientLight );

                const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
                camera.add( pointLight );
                scene.add( camera );

                this.container = container
                this.camera = camera
                this.scene = scene

                // manager
                let self = this
                function loadModel() {

                    self.object.traverse( function ( child ) {

                        if ( child.isMesh ) child.material.map = texture;

                    } );

                    self.object.position.y = - 95;
                    scene.add( self.object );

                }

                const manager = new THREE.LoadingManager( loadModel );

                manager.onProgress = function ( item, loaded, total ) {

                    console.log( item, loaded, total );

                };

                // texture

                const textureLoader = new THREE.TextureLoader( manager );
                const texture = textureLoader.load( '/static/uv_grid_opengl.jpg' );

                // model

                function onProgress( xhr ) {

                    if ( xhr.lengthComputable ) {

                        const percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

                    }

                }

                function onError() {}

                const loader = new OBJLoader( manager );
                loader.load( '/static/male02.obj', function ( obj ) {

                    self.object = obj;

                }, onProgress, onError );

                //

                let renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                this.renderer = renderer
                this.container.appendChild( renderer.domElement );

                document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );

                //

                window.addEventListener( 'resize', this.onWindowResize, false );
            },

            onWindowResize() {
                this.windowHalfX = window.innerWidth / 2;
                this.windowHalfY = window.innerHeight / 2;
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
            },

            onDocumentMouseMove( event ) {

                this.mouseX = ( event.clientX - this.windowHalfX ) / 2;
                this.mouseY = ( event.clientY - this.windowHalfY ) / 2;

            },

            animate() {

                requestAnimationFrame( this.animate );
                this.render();

            },

            render() {

                this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
                this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;

                this.camera.lookAt( this.scene.position );

                this.renderer.render( this.scene, this.camera );

            },

            // 灯光效果
            light() {
                //添加聚光灯光源
                let light0 = new THREE.SpotLight(0xffffff);
                light0.position.set(-40, 60, -10);
                light0.castShadow = true;
                light0.shadow.mapSize.width = 2048;
                light0.shadow.mapSize.height = 2048;
                this.scene.add(light0);

                let light = new THREE.DirectionalLight(0xdfebff, 0.45); //从正上方（不是位置）照射过来的平行光，0.45的强度
                light.position.set(50, 200, 100);
                light.position.multiplyScalar(0.3);
                this.scene.add(light);
                //添加环境光
                let ambientLight = new THREE.AmbientLight("#ffffff");
                this.scene.add(ambientLight);
                console.log('light')
            },

        },
    }
</script>

<style scoped>
    .background {
        color: #ff3300;
    }
</style>
