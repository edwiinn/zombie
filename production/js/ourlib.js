function animate(){
    deltaTime = clock.getDelta();
    
    requestAnimationFrame( animate );
    camera.updateProjectionMatrix();
    
    for(var i=0; i<numEnemy; i++){
        modDir["enemy_"+i].position.x += ((0 - modDir["enemy_"+i].position.x)*deltaTime*0.05);
        modDir["enemy_"+i].position.z += ((0 - modDir["enemy_"+i].position.z)*deltaTime*0.05);
        if(clock.getElapsedTime() > 1.0 && Math.floor(clock.getElapsedTime())%60 == 0 && numEnemy<40){
            numEnemy+=1;
            loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy-1), [0.04, 0.025, 0.03], [generatePosition(60, 120), 0, generatePosition(60, 120)], null);
        }
    }

    //   for(var i=0;i<mixer.length;i++)
    //   if ( mixer[i] ) mixer[i].update( deltaTime );
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
                console.log(objName+" have been loaded");
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
                    generateAnimation(modDir[objName],obj.animations);
                scene.add( obj.scene );
                console.log(objNameName+" have been loaded");
                return;
        },
        function ( xhr ) {return;},
        function ( err ) {return;}

    );
}



//tambahan
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))
