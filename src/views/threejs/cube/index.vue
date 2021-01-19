<template>
  <div id="canvasFrame" ref="canvasFrame" style="width: 100%; height: 400px;"></div>
</template>

<script>

    import * as THREE from 'three';
    const OrbitControls = require("three-orbit-controls")(THREE);
    import * as dat from 'dat.gui';

    export default {
        name: "cube",
        data() {
            return {}
        },
        mounted() {
          // threeStart()
            var scene = new THREE.Scene();

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true

            var axis = new THREE.AxesHelper(30)
            scene.add(axis)

            var color = new THREE.Color("rgb(255,0,0)")
            var grid = new THREE.GridHelper(50, 10, color, 0x000000)
            scene.add(grid)

            // renderer.setClearColor(0xFFFFFF, 1.0);
            this.$refs.canvasFrame.appendChild( renderer.domElement );
            var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

            camera.position.x = 40;
            camera.position.y = 40;
            camera.position.z = 40;
            camera.lookAt(scene.position);

            const controls = new OrbitControls(camera, renderer.domElement)
            // controls.addEventListener('change', renderer)

            var cubeGeometry = new THREE.BoxGeometry(4,4,4);
            var material = new THREE.MeshLambertMaterial({color: 0xff3300});
            var cube = new THREE.Mesh(cubeGeometry, material);
            cube.position.x = 2
            cube.position.y = 2
            cube.position.z = 2
            cube.castShadow = true
            // scene.add(cube);

            var cube2 = new THREE.Mesh(cubeGeometry, material);
            cube2.position.x = 8
            cube2.position.y = 2
            cube2.position.z = 8
            cube2.castShadow = true
            // scene.add(cube2);

            var geometry = new THREE.Geometry();
            cube.updateMatrix()
            geometry.merge(cube.geometry, cube.matrix)
            cube2.updateMatrix()
            geometry.merge(cube2.geometry, cube2.matrix)
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            var planeGeometry = new THREE.PlaneGeometry(30, 30, 30)
            var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
            var plane = new THREE.Mesh(planeGeometry, planeMaterial)
            plane.rotation.x = -.5 * Math.PI
            plane.receiveShadow = true
            scene.add(plane)

            var spotLight = new THREE.SpotLight(0xffffff)
            spotLight.castShadow = true
            spotLight.position.set(15, 30, 50)
            scene.add(spotLight)

            var guiCon = new function () {
                this.rX = 0.01
                this.rY = 0.01
                this.rZ = 0.01
            }
            var datGUI = new dat.GUI()
            datGUI.add(guiCon, 'rX', 0, 1)
            datGUI.add(guiCon, 'rY', 0, 1)
            datGUI.add(guiCon, 'rZ', 0, 1)

            var render = function (){
              // renderer.clear();
              //     cube.rotation.x += guiCon.rX
              //     cube.rotation.y += guiCon.rY
              //     cube.rotation.z += guiCon.rZ
                  renderer.render(scene, camera);
                  requestAnimationFrame(render);
            }
            render()
        },
    }
</script>

<style scoped>
    .background {
        color: #ff3300;
    }
</style>
