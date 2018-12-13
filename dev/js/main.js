"use strict";

var gun;
var vec = new THREE.Vector3();

function waitGunLoaded(){
    gun = scene.getObjectByName("gun");

    if(gun != null){ // initialize loaded object
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
    objectLoader.setCrossOrigin("use-credentials");
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1028, 514);
    renderer.setClearColor(0x000000, 1);
    document.getElementById("container").appendChild(renderer.domElement);

    // init important var
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 10000);
    camera.position.set(0, 4, 0);
    light = new THREE.AmbientLight(0x404040);
    clock = new THREE.Clock();

    scene.add(light);
    camera.scale.set(0.5, 0.5, 0.5);
    camera.translateZ(50);
    // create plane
    plane = new THREE.Mesh(new THREE.BoxGeometry(100, 4, 100),
                            new THREE.MeshPhongMaterial ({
                            color: 0xf74321,
                            shininess: 10,
                            specular: 0x000000}));
    scene.add(plane);

	controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );
	return;
}


document.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'w':
            camera.position.set(
                camera.position.x,
                camera.position.y,
                camera.position.z - movSpeed * deltaTime
            );
            break;
        case 'd':
            camera.position.set(
                camera.position.x + movSpeed * deltaTime,
                camera.position.y,
                camera.position.z
            );
            // camera.translateX(movSpeed * deltaTime);
            break;
        case 's':
            camera.position.set(
                camera.position.x,
                camera.position.y,
                camera.position.z + movSpeed * deltaTime
            );
            // camera.translateY((-1) * movSpeed * deltaTime);
            break;
        case 'a':
            camera.position.set(
                camera.position.x - movSpeed * deltaTime,
                camera.position.y,
                camera.position.z
            );
            // camera.translateX((-1) * movSpeed * deltaTime);
            break;
        default:
            break;
    }
});
