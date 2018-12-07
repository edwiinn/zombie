"use strict";

(function(){    // Auto run function
    // declaration of important variables
    renderer = new THREE.WebGLRenderer({antialias: true});
    scene = new THREE.Scene();
    light = new THREE.AmbientLight();
    clock = new THREE.Clock();

})();

function animate(){
    render();
}

function render(){
    renderer.render(scene, camera);
}