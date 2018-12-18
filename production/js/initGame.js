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



    loader_t = new THREE.TextureLoader();
    //scene background
    var textureBackground = loader_t.load( 'assets/textures/background.jpg');
    textureBackground.wrapS = textureBackground.wrapT = THREE.RepeatWrapping;
    textureBackground.repeat.set( 1, 1 );
    textureBackground.anisotropy = 20;
    scene.background = textureBackground;
    //scene.fog = new THREE.Fog( 0x525252, 30, 100 );
    // create ground
    
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
            loadObjectGLTF("statis/tree/scene.gltf","tree",[0.02,0.02,0.02],[-20,0,20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_2",[0.02,0.02,0.02],[20,0,-20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_3",[0.02,0.02,0.02],[-20,0,-20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_4",[0.02,0.02,0.02],[20,0,20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_5",[0.02,0.02,0.02],[-40,0,70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_6",[0.02,0.02,0.02],[40,0,-70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_7",[0.02,0.02,0.02],[-40,0,-70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_8",[0.02,0.02,0.02],[40,0,70],null);
            //bat apear from
          //tomb
            loadObjectGLTF("statis/tomb1/scene.gltf","tomb1_1",[0.4,0.4,0.4],[20,0,10],null);
            loadObjectGLTF("statis/remains/scene.gltf","tomb1_2",[0.4,0.4,0.4],[20,0,-15],null);
            loadObjectGLTF("statis/remains/scene.gltf","tomb1_3",[0.4,0.4,0.4],[-10,0,-5],null);

            loadObjectGLTF("statis/tomb3/scene.gltf","tomb3_1",[0.1,0.1,0.1],[10,-0.07,-10],null);
            loadObjectGLTF("statis/tomb4/scene.gltf","tomb4_1",[0.1,0.1,0.1],[7,0.7,15],null);
            loadObjectGLTF("statis/remains/scene.gltf","tomb5_1",[1,1,1],[-13,0.7,15],null);

            //ruin
            loadObjectGLTF("statis/ruin2/scene.gltf","ruin2_1",[0.04,0.04,0.04],[-20,0,-20],null);
            loadObjectGLTF("statis/ruin1/scene.gltf","ruin1_2",[0.02,0.02,0.02],[20,0,20],null);
    // push to scene
    scene.add(camera,meshGround);

	return;
}
