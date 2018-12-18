"use strict";

function initGame(){
    // debug
    // loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy), [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], generateAnimationZombie);


    // utils
    objectLoader.setCrossOrigin("use-credentials");
    var cont = document.getElementById("container");
    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(cont.clientWidth, cont.clientHeight);
    renderer.setClearColor(0x0f0f0f, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    cont.appendChild(renderer.domElement);

    // init scene
    scene = new THREE.Scene();

    // init camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 10000);
    camera.position.set(-200, 300, 300);

    //for test
    var controls = new THREE.OrbitControls( camera );

    // init light
    moonlight(0x222222,[0.1,0.1,0.1],[0,100,40],0.7,1);

    // init clock
    clock = new THREE.Clock();


    //scene background
    scene.background = new THREE.Color( 0x17181C );
    // scene.fog = new THREE.Fog( 0x525252, 30, 100 );
    // create ground
    loader_t = new THREE.TextureLoader();
    var textureGround = loader_t.load( 'assets/textures/ground.jpg');
        textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
        textureGround.repeat.set( 100, 100 );
        textureGround.anisotropy = 20;
    var materialGround = new THREE.MeshLambertMaterial( { map: textureGround } );
    var meshGround = new THREE.Mesh( new THREE.PlaneBufferGeometry( 300, 300 ),materialGround );
    meshGround.rotation.x = - Math.PI / 2;
    meshGround.receiveShadow = true;

    // start interval timer to add enemy
    intervalFunc = setInterval(intervalAddEnemy, 5000);

    //add decoration model
        //statis
          //tree
            loadObjectGLTF("statis/tree/scene.gltf","tree","tree",[0.02,0.02,0.02],[27,0,27],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_2","tree_2",[0.02,0.02,0.02],[-30,0,40],null);
            //bat apear from
          //tomb
            loadObjectGLTF("statis/tomb1/scene.gltf","tomb1_1","tomb1_1",[0.4,0.4,0.4],[20,0,20],generateAnimationZombie);
            loadObjectGLTF("statis/tomb1/scene.gltf","tomb1_2","tomb1_2",[0.4,0.4,0.4],[20,0,15],generateAnimationZombie);


    // push to scene
    scene.add(camera,meshGround);

	return;
}
