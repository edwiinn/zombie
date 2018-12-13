"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, camera, objectLoader, enemies = {}, numEnemy = 2;

objectLoader = new THREE.ObjectLoader();