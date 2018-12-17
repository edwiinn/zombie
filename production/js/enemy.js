"use strict";

// createBaseEnemy: create base model of enemy. Must be finished before running initEnemies
// initEnemies: clone from base model of enemy. Generate random position over X and Z plane
// getEnemiesReference: Add reference to global variable 'enemies'

async function enemyMain(){
    createBaseEnemy();
    await delay(4000);
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

function createBaseEnemy(){
    loadObjectGLTF("zombie_k/scene.gltf", "baseEnemy1", "enemyModel1", [0.04, 0.025, 0.03], [0, 0, 0], null);
}

function initEnemies(){
    var name;
    
	for(var i=0; i < numEnemy ; i++){
        name = "scene_type"+i+".glb";
        loadObjectGLTF("zombie/"+name, "baseEnemy1", "enemyModel1", [0.04, 0.025, 0.03], [0, 0, 0], null);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + maxDistanceValue));
}

