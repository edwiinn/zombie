var renderer, scene, camera;
var group;
var player, cameraOriginVec, gunFlashLight, gun, mouseHelper;

init();
animate();
function init(){
  // init renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // init scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x333333 );

  group = new THREE.Group();
  scene.add( group );

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.x = 0;
  camera.position.z =0;
  camera.position.y =1;
  cameraOriginVec = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);

  var box = createBox(1,1,1);
  box.material.color.set('#0f0');
  box.position.set(2,0.5,4);
  group.add( box );

  var box = createBox(1,1,1);
  box.material.color.set('#ff0');
  box.position.set(5,0.5,4);
  group.add(box);

  var box = createBox(1,1,1);
  box.material.color.set('#00f');
  box.position.set(-1,0.5,-5);
  group.add(box);

  var box = createBox(1,1,1);
  box.material.color.set('#f00');
  box.position.set(-4,0.5,-1);
  group.add(box);

  player = createBox(0.5,1,0.5);
  scene.add(player);
  player.add(camera);
  player.position.set(0,0.5,0)
  var floorGeo = new THREE.PlaneBufferGeometry(2000,2000);
  var floorMat = new THREE.MeshPhongMaterial();
  var floorMsh = new THREE.Mesh(floorGeo, floorMat);
  scene.add(floorMsh);
  floorMsh.rotation.x = - Math.PI * 0.5;
  floorMsh.receiveShadow = true;
  floorMsh.position.set( 0, - 0.05, 0 );

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

  var gunMetalnessTexture = new THREE.TGALoader().load( "asset/modern-weapons/Pistol/Textures/Pistol_Metallic.tga" );
  var gunNormalTexture = new THREE.TextureLoader().load( "asset/modern-weapons/Pistol/Textures/Pistol_Normal.png" );
  var gunAlbedoTexture = new THREE.TextureLoader().load( "asset/modern-weapons/Pistol/Textures/Pistol_Albedo.png" );
  var loader = new THREE.FBXLoader();
  var material = new THREE.MeshStandardMaterial();
  loader.load( 'asset/modern-weapons/Pistol/Pistol.fbx', function ( object ) {
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
  window.addEventListener("mousedown", onDocumentMouseDown, false)
}

function createBox(x, y, z, ccolor){
  var geometry = new THREE.BoxGeometry(x,y,z);
  var material = new THREE.MeshPhongMaterial();
  var box = new THREE.Mesh(geometry, material);
  return box;
}

function onDocumentMouseDown(){
  event.preventDefault();

  if(selectedObject && !isGunFired){
    //event for mouse click on object
    for(var it = 0; it < group.children.length; it++){
      if(group.children[it].id == selectedObject.id){
        group.children[it].geometry.dispose();
        group.children[it].material.dispose();
        group.remove(group.children[it]);
      }
    }
    console.log("box killed");
  }

  isGunFired = true;
  isGunFiredBackTransition = true;
}

var cameraRotateLeft = false;
var cameraRotateRight = false;
var isTransitionCameraDone = true;
var isGunFired = false;
function onDocumentKeyDown(){
  event.preventDefault();
  if(isTransitionCameraDone){
    var keyName = event.key;
    if(keyName == 'a' || keyName == 'A'){
      cameraRotateLeft = true;
      targetRotation = player.rotation.y + Math.PI/2;
      isTransitionCameraDone = false;
    }
    else if(keyName == 'd' || keyName == 'D'){
      cameraRotateRight = true;
      targetRotation = player.rotation.y - Math.PI/2;
      isTransitionCameraDone = false;
    }
  }
}


var targetRotation;
var isGunFiredBackTransition = false;
function animate() {
  if(isGunFired){
    if(isGunFiredBackTransition){
      camera.position.z += 0.3;
      gun.position.z += 0.1;
      if(camera.position.z >= 1){
        isGunFiredBackTransition = false;
      }
    }
    else{
      camera.position.z -= 0.1;
      if(!(gun.position.z <= -1)){
        gun.position.z -= 0.1;
      }
      if(camera.position.z <= 0){
        isGunFired = false;
      }
    }
  }
  if(cameraRotateLeft){
    player.rotation.y += 0.02;
    if(player.rotation.y >= targetRotation){
      cameraRotateLeft = false;
      isTransitionCameraDone = true;
    }
  }
  if(cameraRotateRight){
    player.rotation.y -= 0.02;
    if(player.rotation.y <= targetRotation){
      cameraRotateRight = false;
      isTransitionCameraDone = true;
    }
  }
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

var selectedObject = null;
function onDocumentMouseMove( event ) {
  event.preventDefault();

  if ( selectedObject ) {
    selectedObject.material.color.set( '#0f0' );
    selectedObject = null;
  }
  var intersects = getIntersects( event.layerX, event.layerY );
  camera.position.x = cameraOriginVec.x + mouseVector.x * 0.2;
  camera.position.y = cameraOriginVec.y + mouseVector.y * 0.2;
  gun.rotation.y = Math.PI/2 - Math.PI/2  * mouseVector.x  * 0.5;
  gun.rotation.x = Math.PI/2 * mouseVector.y * 0.3;
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    })[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      selectedObject.material.color.set( '#f00' );
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();

function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;

  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( group, true );
}
