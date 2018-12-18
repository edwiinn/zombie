"use strict";

// enemy: hash table. Key => object name. Value => enemy object reference

var scene, player, light, ground, camera, objectLoader, numEnemy = 0;
var renderer, clock, deltaTime, intervalFunc, playerHP = 100,limitHP =15;

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
var s;
var playerScore = 0;
var pausedDelta = null;
//Camera
var player, cameraOriginVec, gunFlashLight, gun, mouseHelper;
var cameraRotateLeft = false;
var cameraRotateRight = false;
var isTransitionCameraDone = true;
var isGunFired = false;
var targetRotation;
var isGunFiredBackTransition = false;
var selectedObject = null;
var selectedObjectName = "";
var mouseVector = new THREE.Vector3();
var group = new THREE.Group();
var listener = new THREE.AudioListener();
var soundGun = new THREE.Audio( listener );
var soundZombie = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();
var isPause = false;
var opacity=0;

