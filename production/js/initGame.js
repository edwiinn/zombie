"use strict";

function initGame(){
    // utils
    objectLoader.setCrossOrigin("use-credentials");

    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1028, 514);
    renderer.setClearColor(0x0f0f0f, 1);
    document.getElementById("container").appendChild(renderer.domElement);

    // init scene
    scene = new THREE.Scene();

    // init camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 10000);
    camera.position.set(0, 4, 0);

    // init light
    light = new THREE.AmbientLight(0x404040);

    // init clock
    clock = new THREE.Clock();

    // create ground
    ground = new THREE.Mesh(new THREE.BoxGeometry(100, 4, 100),
                            new THREE.MeshPhongMaterial ({
                            color: 0xf74321,
                            shininess: 10,
                            specular: 0x000000}));
    
    // push to scene
    scene.add(camera, light, ground);
    
	return;
}