"use strict";
function onDocumentMouseDown(){
  event.preventDefault();
  if(selectedObject && !isGunFired){
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

function getIntersects( x, y ) {
  var raycaster = new THREE.Raycaster();
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;

  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( group, true );
}
