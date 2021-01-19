<template>
  <div id="canvasFrame" ref="canvasFrame" style="width: 100%; height: 400px;"></div>
</template>

<script>

    import * as THREE from 'three';
    const OrbitControls = require("three-orbit-controls")(THREE);
    import * as dat from 'dat.gui';

    let scene, camera, renderer
    var controls, guiControl, datGUI
    var axis, grid, color
    var cubeGeometry, torGeometry, textGeometry, planeGeometry
    var cubeMeterial, torMeterial, textMeterial, planeMaterial
    var cube, tor, text, plane
    var spotLight
    var status
    var SCREEN_WIDTH, SCREEN_HEIGHT

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0xdddddd)
        renderer.shadowMap.enabled = true
        renderer.shadowMapSoft = true
        controls = new OrbitControls(camera, renderer.domElement)

        axis = new THREE.AxesHelper(30)
        scene.add(axis)
        color = new THREE.Color("rgb(255,0,0)")
        grid = new THREE.GridHelper(50, 5, color, 0x000000)
        scene.add(grid)

        cubeGeometry = new THREE.BoxGeometry(5,5,5);
        cubeMeterial = new THREE.MeshLambertMaterial({color: 0xff3300});
        cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
        cube.position.x = 2.5
        cube.position.y = 4
        cube.position.z = 2.5
        cube.castShadow = true
        scene.add(cube);

        torGeometry = new THREE.TorusKnotGeometry(3, 1, 64, 64);
        torMeterial = new THREE.MeshLambertMaterial({color: 0xffff00});
        tor = new THREE.Mesh(torGeometry, torMeterial);
        tor.position.x = -15
        tor.position.y = 6
        tor.position.z = 2.5
        tor.castShadow = true
        scene.add(tor);

        planeGeometry = new THREE.PlaneGeometry(100, 100, 100)
        planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -.5 * Math.PI
        plane.receiveShadow = true
        scene.add(plane);

        camera.position.x = 40;
        camera.position.y = 40;
        camera.position.z = 40;
        camera.lookAt(scene.position);

        spotLight = new THREE.SpotLight(0xffffff)
        spotLight.castShadow = true
        spotLight.position.set(25, 45, 50)
        scene.add(spotLight)

        var spotLightHelper = new THREE.SpotLightHelper( spotLight );
        scene.add( spotLightHelper );

    }

    function animate() {
        requestAnimationFrame(animate);
        render()
        renderer.render(scene, camera);
    }

    function render() {

    }

    export default {
        name: "three",
        data() {
            return {}
        },
        mounted() {
            init()
            this.$refs.canvasFrame.appendChild( renderer.domElement );

            // new THREE.FontLoader().load("helvetiker_regular.typeface.json", function (font) {
            //     textGeometry = new THREE.TextGeometry('Hello World', {size: 2, height: 1, font:font});
            //     textMeterial = new THREE.MeshLambertMaterial({color: 0xffff00});
            //     text = new THREE.Mesh(textGeometry, textMeterial);
            //     text.position.x = 15
            //     text.position.y = 6
            //     text.position.z = 2.5
            //     scene.add(text);
            // })
            animate()
        },
    }
</script>

<style scoped>
    .background {
        color: #ff3300;
    }
</style>
