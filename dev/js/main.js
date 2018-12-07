"use strict";

var gun;


function animate(){
    camera.updateProjectionMatrix();
    render();
    if(!gun)
        gun = scene.getObjectByName("gun");
    
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
    // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, container_width / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 25000);
    camera.position.set(20, 10, 20);
    // camera.lookAt(0,0,0);
    light = new THREE.AmbientLight(0x404040);
    clock = new THREE.Clock();
    scene.add(camera, light);
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

function objectReady(obj){
    if(obj){
        obj.position.set(0,0,-100);
        return true;
    }
}