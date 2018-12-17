function animate(){
    deltaTime = clock.getDelta();
    requestAnimationFrame( animate );
    camera.updateProjectionMatrix();
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


function loadObjectGLTF(filename){

  gltfloader.load(filename, function ( gltf ) {


					scene.add( gltf.scene );

				}, undefined, function ( e ) {

					console.error( e );

				} );
}

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))