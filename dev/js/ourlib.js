function animate(){
    deltaTime = clock.getDelta();
    requestAnimationFrame( animate );
    camera.updateProjectionMatrix();
    if ( mixer ) mixer.update( deltaTime );
    render();
}

function render(){
    renderer.render(scene, camera);
}

function LockCamera(){
    controls.lock();
    controls.enabled = true;
}


function loadObject(filename, parentName, objName){
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

function loadObjectGLTF(filename, parentName, objName,scale,generateAnimation){ //scale = [[1],[2],[3]]
    console.log(filename);
    loaderGLTF_m = new THREE.GLTFLoader();
    loaderGLTF_m.load(
        "assets/"+filename,
        function ( obj ) {
            // Add the loaded object to the scene
          //  scane.add(gltf.scene);
             if(scene.getObjectByName(objName) == null){
                 var tmp = new THREE.Group();
                 tmp.name = parentName;
                 obj.scene.name = objName;
                 obj.scene.scale.x=scale[0];
                 obj.scene.scale.y=scale[1];
                 obj.scene.scale.z=scale[2];
                 tmp.add(obj.scene);
                 scene.add(tmp );
                 modDir[parentName]=obj.scene;
                 generateAnimation(modDir[parentName],obj.animations);
                 console.log(objName+" have been loaded");
                 return;
             }
        },
        function ( xhr ) {return;},
        function ( err ) {return;}

    );
}


const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))
