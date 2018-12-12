function animate(){
    deltaTime = clock.getDelta();
    requestAnimationFrame( animate );
    // if(controls.enabled){
    camera.updateProjectionMatrix();
    render();

    // }
}

function LockCamera(){
    controls.lock();
    controls.enabled = true;
}


function loadObject(filename, objName, scale){
    loader.load(
        "assets/"+filename,
        function ( obj ) {
            // Add the loaded object to the scene
            // obj.name = objName;
            if(scene.getObjectByName(objName) == null){
                var tmp = new THREE.Group();
                var tmp2;
                tmp.name = objName;
                obj.name = objName;
                tmp.add(obj);

                // tmp2 = tmp.getObjectByName(objName);
                // tmp2.scale.set(scale);
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
