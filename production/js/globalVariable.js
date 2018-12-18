"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, light, ground, camera, objectLoader, numEnemy = 0;
var renderer, clock, deltaTime, intervalFunc;

objectLoader = new THREE.ObjectLoader();

//---------------variabel for model and animation
//Loader
var loaderGLTF_m;//loader gltfloader
var loader_t;//loader texture
var modDir = {};
var actions = {};
var playeragle =(180/360)*6.28;
var movSpeed = 0.1;
var mixer = [];
var anglePlayer = 3.14;
//Camera
var player, cameraOriginVec, gunFlashLight, gun, mouseHelper;
var cameraRotateLeft = false;
var cameraRotateRight = false;
var isTransitionCameraDone = true;
var isGunFired = false;
var targetRotation;
var isGunFiredBackTransition = false;
var selectedObject = null;
var mouseVector = new THREE.Vector3();
