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
    camera.position.set(0, 4, 10);

    //for test
    var controls = new THREE.OrbitControls( camera );

    // init light
    light = new THREE.AmbientLight(0x333333,1);
    moonlight(0x222222,[0.1,0.1,0.1],[0,40,0],30,10000);
    scene.add(light);

    // init clock
    clock = new THREE.Clock();

    //scene background
    scene.background = new THREE.Color( 0x17181C );
    scene.fog = new THREE.Fog( 0x525252, 500, 1000 );
    // create ground
    loader_t = new THREE.TextureLoader();
    var textureGround = loader_t.load( 'assets/textures/ground.jpg');
        textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
        textureGround.repeat.set( 100, 100 );
        textureGround.anisotropy = 20;
    var materialGround = new THREE.MeshLambertMaterial( { map: textureGround } );
    var meshGround = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ),materialGround );
    meshGround.rotation.x = - Math.PI / 2;
    meshGround.receiveShadow = true;
    // push to scene
    scene.add(camera,meshGround);

	return;
}
