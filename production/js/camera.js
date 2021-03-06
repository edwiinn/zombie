"use strict";
function createBox(x, y, z){
  var geometry = new THREE.BoxGeometry(x,y,z);
  var material = new THREE.MeshPhongMaterial();
  var box = new THREE.Mesh(geometry, material);
  return box;
}
function onDocumentMouseDown(event){
  event.preventDefault();
  if(event.buttons == 1 && !isGunFired){
    if(selectedObject){
      playerScore += 1;
      scoreBoard.innerHTML = playerScore;
      var name = selectedObject.parent.parent.parent.parent.parent.parent.parent.name;
      fallingXto(name);
    }
    isGunFired = true;
    isGunFiredBackTransition = true;
    audioLoader.load( 'assets/soundGun.wav', function( buffer ) {
      soundGun.setBuffer( buffer );
      soundGun.setLoop( false );
      soundGun.setVolume( 0.5 );
      soundGun.play();
    });

  }
}

function onDocumentKeyDown(){
  event.preventDefault();
  var keyName = event.key;
  if(keyName == "Escape"){
    isPause = !isPause;
    if(isPause)
      document.getElementById('pause-image').style.display = "block";
    else
      document.getElementById('pause-image').style.display = "none";
  }
  if(isTransitionCameraDone){
    console.log(keyName);
    if(keyName == 'a' || keyName == 'A'){
      cameraRotateLeft = true;
      targetRotation = player.rotation.y + Math.PI/4;
      isTransitionCameraDone = false;
    }
    else if(keyName == 'd' || keyName == 'D'){
      cameraRotateRight = true;
      targetRotation = player.rotation.y - Math.PI/4;
      isTransitionCameraDone = false;
    }
  }
}

function onDocumentMouseMove( event ) {
  event.preventDefault();

  if ( selectedObject ) {
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
      // selectedObject.material.color.set( '#f00' );
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
var raycaster = new THREE.Raycaster();

function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;

  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject(group , true );
}
