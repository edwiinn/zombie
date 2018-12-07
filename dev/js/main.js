"use strict";

var gun;

(function(){    // Auto run function
    // declaration of important variables
    container_width = document.getElementById("container").width;
    container_height = document.getElementById("container").height;
    loader = new THREE.JSONLoader();  // used to load JSON file of model
    loader.load( 'assets/.json', function ( geometry, materials ) {
        var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        scene.add( mesh );
    });
    renderer = new THREE.WebGLRenderer({antialias: true});
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( container_width / - 2, container_width / 2, container_height / 2, container_height / - 2, 1, 1000 );
    light = new THREE.AmbientLight(0x404040);
    clock = new THREE.Clock();
    scene.add(camera, light);

})();

function animate(){
    render();
}

function render(){
    
    renderer.render(scene, camera);
}