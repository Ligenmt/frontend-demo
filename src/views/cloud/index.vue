<template>
  <div ref="cloud">

  </div>
</template>


<script>

    import * as THREE from 'three';
    import OrbitControls from 'three-orbitcontrols'

    var vs = [
      "varying vec2 vUv;",
      "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}",
    ].join("\n");

    var fs = [
      "uniform sampler2D map;",
      "uniform vec3 fogColor;",
      "uniform float fogNear;",
      "uniform float fogFar;",
      "varying vec2 vUv;",
      "void main() {",
      "float depth = gl_FragCoord.z / gl_FragCoord.w;",
      "float fogFactor = smoothstep( fogNear, fogFar, depth );",
      "gl_FragColor = texture2D( map, vUv );",
      "gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );",
      "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",
      "}",
    ].join("\n");

    export default {
        name: "cloud",
        data() {
            return {}
        },
        mounted() {

            var canvas = document.createElement( 'canvas' );
            canvas.width = 32;
            canvas.height = window.innerHeight;
            var context = canvas.getContext( '2d' );
            var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
            gradient.addColorStop(0, "#1e4877");
            gradient.addColorStop(0.5, "#4584b4");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            this.$refs.cloud.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
            this.$refs.cloud.style.backgroundSize = '32px 100%';

            var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); //背景透明
            renderer.setSize( window.innerWidth, window.innerHeight );
            this.$refs.cloud.appendChild( renderer.domElement );

            var scene = new THREE.Scene();

            var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 3000 );
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 3000;
            camera.lookAt(scene.position);

            // var axis = new THREE.AxesHelper(30)
            // scene.add(axis)

            var mouseX = 0
            var mouseY = 0;
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            // const controls = new OrbitControls(camera, renderer.domElement)
            var loader2 = new THREE.TextureLoader();
            loader2.load("/static/cloud10.png",
                function (texture) {
                    texture.magFilter = THREE.LinearMipMapLinearFilter;
                    texture.minFilter = THREE.LinearMipMapLinearFilter;
                    var fog = new THREE.Fog(0x4584b4, - 100, 3000);
                    var material = new THREE.ShaderMaterial( {
                      uniforms: {
                        "map": { type: "t", value: texture },
                        "fogColor" : { type: "c", value: fog.color },
                        "fogNear" : { type: "f", value: fog.near },
                        "fogFar" : { type: "f", value: fog.far },
                      },
                      vertexShader: vs,
                      fragmentShader: fs,
                      depthWrite: false,
                      depthTest: false,
                      transparent: true
                    });
                    var geometry = new THREE.Geometry();
                    const cloudCount = 3000
                    for (var i = 0; i < cloudCount; i++ ) {
                        var plane = new THREE.Mesh( new THREE.PlaneGeometry(64, 64), material);
                        plane.position.x = Math.random() * 1000 - 500;
                        plane.position.y = - Math.random() * Math.random() * 200 - 15;
                        plane.position.z = i;
                        plane.rotation.z = Math.random() * Math.PI;
                        plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
                        ////这个用来把合并前的变换矩阵带进geometry保证对象合并后正确的变换
                        plane.updateMatrix()
                        geometry.merge(plane.geometry, plane.matrix);
                        // scene.add(plane)
                        // var plane2 = new THREE.Mesh( new THREE.PlaneGeometry(64, 64), material);
                        // plane2.position.x = plane.position.x
                        // plane2.position.y = plane.position.y
                        // plane2.position.z = i - cloudCount;
                        // plane2.rotation.z = plane.rotation.z
                        // plane2.scale.x = plane.scale.x
                        // geometry.merge(plane.geometry, plane.matrix);
                        // scene.add(plane2)
                    }
                    var mesh = new THREE.Mesh(geometry, material);
                    var mesh2 = new THREE.Mesh(geometry, material);
                    scene.add(mesh);
                    mesh2.position.z = -3000;
                    scene.add(mesh2);
                },
                function (xhr) {
                    console.log( 'No error happened' );
                },
                function (xhr) {
                    console.log( 'An error happened' );
                });

            var start_time = Date.now();
            var position = 0
            var animate = function () {
                requestAnimationFrame( animate );
                position = ( ( Date.now() - start_time ) * 0.03 ) % 3000;
                camera.position.x += ( mouseX - camera.position.x ) * 0.01;
                camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
                camera.position.z = - position + 3000;
                renderer.render( scene, camera );
            };
            animate();

            document.addEventListener( 'mousemove', function (event) {
                mouseX = ( event.clientX - windowHalfX ) * 0.25;
                mouseY = ( event.clientY - windowHalfY ) * 0.15;
            }, false );
        },
    }
</script>

<style scoped>

</style>
