"use strict";
console.warn = function(){};
function initGame(){
  healthBoard = document.getElementById('hpfront');
  scoreBoard = document.getElementById('skorfront');

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

    // MainCamera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.x = 0;
    camera.position.z =0;
    camera.position.y =3;
    cameraOriginVec = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);

    // init light
    // moonlight(0x222222,[0.1,0.1,0.1],[0,100,40],0.4,1);

    // init clock
    clock = new THREE.Clock();

    //scene background
    scene.background = new THREE.Color( 0x101010);
    scene.fog = new THREE.Fog( 0x121212, 10, 30 );

    // create ground
    loader_t = new THREE.TextureLoader();
    var textureGround = loader_t.load( 'assets/textures/ground.jpg');
        textureGround.wrapS = textureGround.wrapT = THREE.RepeatWrapping;
        textureGround.repeat.set( 100, 100 );
        textureGround.anisotropy = 20;
    var materialGround = new THREE.MeshPhongMaterial( { map: textureGround } );
    var meshGround = new THREE.Mesh( new THREE.PlaneBufferGeometry( 300, 300 ),materialGround );
    meshGround.rotation.x = - Math.PI / 2;
    meshGround.receiveShadow = true;

    // start interval timer to add enemy
    // intervalFunc = setInterval(intervalAddEnemy, 10000);
    intervalFunc = setInterval(function(){
      if(!isPause){
        intervalAddEnemy();
      }
    }, 10000);

    //add decoration model
        //statis
          //tree
            loadObjectGLTF("statis/tree/scene.gltf","tree",[0.03,0.05,0.02],[-20,0,20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_2",[0.03,0.05,0.02],[20,0,-20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_3",[0.02,0.05,0.02],[-20,0,-20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_4",[0.02,0.02,0.03],[20,0,20],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_5",[0.02,0.05,0.04],[-60,0,70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_6",[0.03,0.05,0.02],[-60,0,-70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_7",[0.06,0.05,0.06],[60,0,-70],null);
            loadObjectGLTF("statis/tree/scene.gltf","tree_8",[0.08,0.08,0.08],[60,0,70],null);
            //
           //ruin
            loadObjectGLTF("statis/ruin2/scene.gltf","ruin2_1",[0.04,0.04,0.04],[-20,0,-20],null);
            loadObjectGLTF("statis/ruin1/scene.gltf","ruin1_2",[0.02,0.02,0.02],[20,0,20],null);
    // push to scene
    scene.add(meshGround);

    player = createBox(0.5,1,0.5);
    player.material.color.set('#000');
    scene.add(player);
    player.add(camera);
    player.position.set(0,0.5,0);

    var senterSpotLight = new THREE.SpotLight(0xffffff, 4);
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

      object.rotation.y = Math.PI/2;
      object.position.set(0.3,-0.44,-1);
      object.scale.set(0.05,0.05,0.05);

      material.roughness = 1; // attenuates roughnessMap
      material.metalness = 1; // attenuates metalnessMap
      material.map = gunAlbedoTexture;
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
    scene.add(group);
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( "mousemove", onDocumentMouseMove, false );
    window.addEventListener('keydown', onDocumentKeyDown, false);
    window.addEventListener("mousedown", onDocumentMouseDown, false);

    var listener = new THREE.AudioListener();
    camera.add( listener );

}
