"use strict";

var gun;
var vec = new THREE.Vector3();



function animate(){
    camera.updateProjectionMatrix();
	render();
    requestAnimationFrame( animate );
    // console.log(gun);
}

function waitObjectLoaded(){
    gun = scene.getObjectByName("gun");
    console.log("hah");
    
    if(gun != null){ // initialize loaded object
        console.log("load");
        
        gun.position.set(5, -7.5, -4.5);
        gun.rotateY(Math.PI*0.6);
        gun.rotateZ(Math.PI*0.06);
		
		camera.add(gun);
    }
    return;
}

function render(){
    renderer.render(scene, camera);
}

function initGame(){
    // declaration of important variables
    loader = new THREE.ObjectLoader();  // used to load JSON file of model
    loader.setCrossOrigin("use-credentials");
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1028, 514);
    renderer.setClearColor(0x000000, 1);
    document.getElementById("container").appendChild(renderer.domElement);
    
    // init important var
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 2500);
    camera.position.set(0, 7.5, 0);
    light = new THREE.AmbientLight(0x404040);
    clock = new THREE.Clock();

    scene.add(light);

    // load gun object from json file
    loadObject("gun.json", "gun");

    // create plane
    plane = new THREE.Mesh(new THREE.BoxGeometry(10000, 4, 10000),
                            new THREE.MeshPhongMaterial ({
                            color: 0xf74321,
                            shininess: 100,
                            specular: 0x111111}));
    plane.translateZ(-500);
    scene.add(plane);
    
	controls = new THREE.PointerLockControls( camera );
    
    scene.add( controls.getObject() );
	
	return;
}


function loadObject(filename, objName){
    loader.load(
        "assets/"+filename,
        function ( obj ) {
            // Add the loaded object to the scene
            obj.name = objName;
            if(scene.getObjectByName(objName) == null){
                scene.add( obj );
                console.log(objName+" have been loaded");
                return;
            }
        },
        function ( xhr ) {},
        function ( err ) {}
    );
}

