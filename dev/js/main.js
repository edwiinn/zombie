"use strict";

var gun;
var objLoad;

function animate(){
    camera.updateProjectionMatrix();
    render();
    requestAnimationFrame( animate );
}

function render(){
    renderer.render(scene, camera);
}

(function(){    // Auto run function
    // declaration of important variables
    loader = new THREE.ObjectLoader();  // used to load JSON file of model
    loader.setCrossOrigin("use-credentials");
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);

    loadObject("gun.json", "gun");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 2500);
    light = new THREE.AmbientLight(0x404040);
    clock = new THREE.Clock();
    scene.add(camera, light);
    objLoad = setInterval(waitObjectLoaded, 100);
    animate();
    
})();


function loadObject(filename, objName){
    loader.load(
        // resource URL
        "assets/"+filename,
    
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            // Add the loaded object to the scene
            obj.name = objName;
            scene.add( obj );
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
    
        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
    );
}

function waitObjectLoaded(){ // used to regularly get all object loaded. stop if all object are not null
    gun = scene.getObjectByName("gun");
    if(gun != null){ // initialize loaded object
        gun.position.set(4.5, -7.5, -4.5);
        gun.rotateY(Math.PI*0.6);
        gun.rotateZ(Math.PI*0.06);
        clearInterval(objLoad);
    }
}