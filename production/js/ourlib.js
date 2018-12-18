function animate(){

    deltaTime = clock.getDelta();
    if(isGunFired){
      if(isGunFiredBackTransition){
        camera.position.z += 0.3;
        gun.position.z += 0.1;
        if(camera.position.z >= 1){
          isGunFiredBackTransition = false;
        }
      }
      else{
        camera.position.z -= 0.06;
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
    camera.updateProjectionMatrix();

    for(var i=0; i<numEnemy; i++){
        if(modDir["enemy_"+i] == undefined) continue;
        var s = Math.sqrt(Math.pow(modDir["enemy_"+i].position.x, 2) + Math.pow(modDir["enemy_"+i].position.z, 2));
        if (s < 40){
            audioLoader.load( 'assets/zombie.wav', function( buffer ) {
                soundZombie.setBuffer( buffer );
                soundZombie.setLoop( false);
                soundZombie.setVolume( 0.5 * (40.0 - s)/40.0 );
                soundZombie.play();
              });
        }
        if(s > 5)
            modDir["enemy_"+i].position.x += ((0 - modDir["enemy_"+i].position.x) * deltaTime * movSpeed),
            modDir["enemy_"+i].position.z += ((0 - modDir["enemy_"+i].position.z) * deltaTime * movSpeed);
        else attackXto("enemy_"+i);
    }


    for(var i=0;i<mixer.length;i++)
        if ( mixer[i] ) mixer[i].update( deltaTime );
    render();
}

function render(){
    renderer.render(scene, camera);
}

function LockCamera(){
    controls.lock();
    controls.enabled = true;
}


function loadObject (filename, parentName, objName){
    objectLoader.load(
        "assets/"+filename,
        function ( obj ) {
            // Add the loaded object to the scene
            if(scene.getObjectByName(objName) == null){
                var tmp = new THREE.Group();
                tmp.name = parentName;
                obj.name = objName;
                tmp.add(obj);
                scene.add( tmp );
                return;
            }
        },
        function ( xhr ) {return;},
        function ( err ) {return;}
    );
}

function loadObjectGLTF(filename, objName, scale, position, generateAnimation){
    loaderGLTF_m = new THREE.GLTFLoader();
    loaderGLTF_m.load(
        "assets/"+filename,
        function ( obj ) {
                obj.scene.name = objName;
                if(scale!=null){
                    obj.scene.scale.x=scale[0];
                    obj.scene.scale.y=scale[1];
                    obj.scene.scale.z=scale[2];
                }
                if(position!=null){
                    obj.scene.position.x=position[0];
                    obj.scene.position.y=position[1];
                    obj.scene.position.z=position[2];
                }

                modDir[objName]=obj.scene;
                if(generateAnimation!=null)
                    generateAnimation(obj.scene,obj.animations);
                scene.add( obj.scene );
                console.log(objNameName+" have been loaded");
                return;
        },
        function ( xhr ) {return;},
        function ( err ) {return;}

    );
}

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))
