"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, camera, objectLoader, enemies = {}, numEnemy = 2;
var renderer, clock, controls, deltaTime;
var mixer;
objectLoader = new THREE.ObjectLoader();


//---------------variabel for model and animation
//Loader
var loaderGLTF_m;//loader gltfloader
var loader_t;//loader texture
var modDir = {};
var actions = {};
var playeragle =(180/360)*6.28;

