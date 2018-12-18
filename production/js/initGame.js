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
    // camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 10000);
    // camera.position.set(-200, 300, 300);
    // MainCamera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.x = 0;
    camera.position.z =0;
    camera.position.y =1;
    cameraOriginVec = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);

    //for test
    // var controls = new THREE.OrbitControls( camera );

    // init light
    // moonlight(0x222222,[0.1,0.1,0.1],[0,100,40],0.7,1);

    // init clock
    clock = new THREE.Clock();



    loader_t = new THREE.TextureLoader();
    //scene background
    var textureBackground = loader_t.load( 'assets/textures/background.jpg');
    textureBackground.wrapS = textureBackground.wrapT = THREE.RepeatWrapping;
    textureBackground.repeat.set( 2, 2 );
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
    intervalFunc = setInterval(intervalAddEnemy, 20000);

    //add decoration model
        //statis
          //tree
          //   loadObjectGLTF("statis/tree/scene.gltf","tree",[0.02,0.02,0.02],[-20,0,20],null);
          //   loadObjectGLTF("statis/tree/scene.gltf","tree_2",[0.02,0.02,0.02],[20,0,-20],null);
          //   loadObjectGLTF("statis/tree/scene.gltf","tree_3",[0.02,0.02,0.02],[-20,0,-20],null);
          //   loadObjectGLTF("statis/tree/scene.gltf","tree_4",[0.02,0.02,0.02],[20,0,20],null);
          //   loadObjectGLTF("statis/tree/scene.gltf","tree_5",[0.02,0.02,0.02],[-40,0,70],null);
          //   loadObjectGLTF("statis/tree/scene.gltf","tree_6",[0.02,0.02,0.02],[40,0,-70],null);
          //
          //   //bat apear from
          // //tomb
          //   loadObjectGLTF("statis/tomb1/scene.gltf","tomb1_1",[0.4,0.4,0.4],[20,0,10],null);
          //   loadObjectGLTF("statis/remains/scene.gltf","tomb1_2",[0.4,0.4,0.4],[20,0,-15],null);
          //   loadObjectGLTF("statis/remains/scene.gltf","tomb1_3",[0.4,0.4,0.4],[-10,0,-5],null);
          //
          //   loadObjectGLTF("statis/tomb3/scene.gltf","tomb3_1",[0.1,0.1,0.1],[10,-0.07,-10],null);
          //   loadObjectGLTF("statis/tomb4/scene.gltf","tomb4_1",[0.1,0.1,0.1],[7,0.7,15],null);
          //   loadObjectGLTF("statis/remains/scene.gltf","tomb5_1",[1,1,1],[-13,0.7,15],null);
          //
          //   //ruin
          //   loadObjectGLTF("statis/ruin2/scene.gltf","ruin2_1",[0.04,0.04,0.04],[-20,0,-20],null);
          //   loadObjectGLTF("statis/ruin1/scene.gltf","ruin1_2",[0.02,0.02,0.02],[20,0,20],null);
    // push to scene
    scene.add(meshGround);

      player = createBox(0.5,1,0.5);
      scene.add(player);
      player.add(camera);
      player.position.set(0,0.5,0);

    var ambientLight = new THREE.AmbientLight(0xffffff,0.1);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff, 0.04);
    spotLight.penumbra = 0.486;
    spotLight.decay = 0.5;
    spotLight.position.set( 0, 10, 0 );
    scene.add(spotLight);
    var senterSpotLight = new THREE.SpotLight(0xffffff, 0.7);
    senterSpotLight.penumbra = 0.5;
    senterSpotLight.position.set(0,2.3,0);
    scene.add(senterSpotLight);
    var senterTarget = new THREE.Object3D();
    camera.add(senterTarget);
    senterTarget.position.set(0,4,-8);
    senterSpotLight.target = senterTarget;

    var gunMetalnessTexture = new THREE.TGALoader().load( "assets/modern-weapons/Pistol/Textures/Pistol_Metallic.tga" );
    var gunNormalTexture = new THREE.TextureLoader().load( "assets/modern-weapons/Pistol/Textures/Pistol_Normal.png" );
    var gunAlbedoTexture = new THREE.TextureLoader().load( "assets/modern-weapons/Pistol/Textures/Pistol_Albedo.png" );
    var loader = new THREE.FBXLoader();
    var material = new THREE.MeshStandardMaterial();
    loader.load( 'assets/modern-weapons/Pistol/Pistol.fbx', function ( object ) {
      // mesh.scale.set( 2, 2, 2 );
      // object.mesh.scale.set(1,1,1);

      object.rotation.y = Math.PI/2;
      object.position.set(0.3,-0.44,-1);
      object.scale.set(0.05,0.05,0.05);

      material.roughness = 1; // attenuates roughnessMap
      material.metalness = 1; // attenuates metalnessMap

      material.metalnessMap = material.roughnessMap = gunMetalnessTexture;
      material.normalMap = gunNormalTexture;
      object.traverse(function (child){
        if(child instanceof THREE.Mesh){
          child.material = material;
        }
      });
      gun = object;
      camera.add( object );
    } );

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( "mousemove", onDocumentMouseMove, false );
    window.addEventListener('keydown', onDocumentKeyDown, false);
    window.addEventListener("mousedown", onDocumentMouseDown, false);
}
