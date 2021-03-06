function animate(){
    deltaTime = clock.getDelta();
    requestAnimationFrame( animate );
    camera.updateProjectionMatrix();

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

function loadObjectGLTF(filename, parentName, objName, scale,position,generateAnimation){
    loaderGLTF_m = new THREE.GLTFLoader();                  //position =[[x],[y],[z]]
    loaderGLTF_m.load(                                     //scale =[[x],[y],[z]]
        "assets/"+filename,
        function ( obj ) {
             if(scene.getObjectByName(objName) == null){
                 var tmp = new THREE.Group();
                 tmp.name = parentName;
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
                 tmp.add(obj.scene);
                 scene.add(tmp );
                 modDir[parentName]=obj.scene;
                 if(generateAnimation!=null)
                 generateAnimation(modDir[parentName],obj.animations);
                 console.log(objName+" have been loaded");
                 return;
             }
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
