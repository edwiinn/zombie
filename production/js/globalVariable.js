"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, light, ground, camera, objectLoader, enemies = {}, numEnemy = 10;
var renderer, clock, deltaTime;

objectLoader = new THREE.ObjectLoader();


