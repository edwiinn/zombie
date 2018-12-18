"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, light, ground, camera, objectLoader, numEnemy = 1;
var renderer, clock, deltaTime;

objectLoader = new THREE.ObjectLoader();

//---------------variabel for model and animation
//Loader
var loaderGLTF_m;//loader gltfloader
var loader_t;//loader texture
var modDir = {};
var animDir = {};
var actions = {};
var playeragle =(180/360)*6.28;
var movSpeed = 0.05;