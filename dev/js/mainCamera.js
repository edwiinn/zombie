var renderer, scene, camera;
var group;
var senterTarget;

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

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.x = 0;
  camera.position.z =0;
  camera.position.y =1.5;
  // camera.lookAt(box);
  // camera.position.set(30,5,0);
  // camera.up = new THREE.Vector3(0,0,1);
  // camera.lookAt(new THREE.Vector3(0,0,0));

  // var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
  // var boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  // var box = new THREE.Mesh( boxGeometry, boxMaterial );
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

  var player = createBox(0.5,1,0.5);
  scene.add(player);
  player.position.set(0,0.5,0)
  var floorGeo = new THREE.PlaneBufferGeometry(2000,2000);
  var floorMat = new THREE.MeshPhongMaterial();
  var floorMsh = new THREE.Mesh(floorGeo, floorMat);
  scene.add(floorMsh);
  floorMsh.rotation.x = - Math.PI * 0.5;
  floorMsh.receiveShadow = true;
  floorMsh.position.set( 0, - 0.05, 0 );

  var ambientLight = new THREE.AmbientLight(0xffffff,0.2);
  scene.add(ambientLight);
  //
  var spotLight = new THREE.SpotLight(0xffffff, 0.3);
  spotLight.penumbra = 0.486;
  spotLight.decay = 0.5;
  spotLight.position.set( 0, 10, 0 );
  scene.add(spotLight);

  senterSpotLight = new THREE.SpotLight(0xffffff, 0.7);
  senterSpotLight.penumbra = 0.5;
  senterSpotLight.position.set(0,2.3,0);
  senterTarget = new THREE.Object3D();
  var spotLightHelper = new THREE.SpotLightHelper( senterSpotLight );
  scene.add( spotLightHelper );
  scene.add(senterSpotLight);
  // scene.add(senterTarget);
  camera.add(senterTarget);
  senterTarget.position.set(0,4,-8);
  senterSpotLight.target = senterTarget;

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
  if(selectedObject){
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
}

var cameraRotateLeft = false;
var cameraRotateRight = false;
var isTransitionCameraDone = true;
function onDocumentKeyDown(){
  event.preventDefault();
  if(isTransitionCameraDone){
    var keyName = event.key;
    if(keyName == 'a' || keyName == 'A'){
      cameraRotateLeft = true;
      targetRotation = camera.rotation.y + Math.PI/2;
      isTransitionCameraDone = false;
    }
    else if(keyName == 'd' || keyName == 'D'){
      cameraRotateRight = true;
      targetRotation = camera.rotation.y - Math.PI/2;
      isTransitionCameraDone = false;
    }
  }
}


var targetRotation;
function animate() {
  if(cameraRotateLeft){
    camera.rotation.y += 0.02;
    if(camera.rotation.y >= targetRotation){
      cameraRotateLeft = false;
      isTransitionCameraDone = true;
    }
  }
  if(cameraRotateRight){
    camera.rotation.y -= 0.02;
    if(camera.rotation.y <= targetRotation){
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
  console.log(mouseVector);
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
