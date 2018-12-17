"use strict";

// createBaseEnemy: create base model of enemy. Must be finished before running initEnemies
// initEnemies: clone from base model of enemy. Generate random position over X and Z plane
// getEnemiesReference: Add reference to global variable 'enemies'

async function enemyMain(){
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

function initEnemies(){
    var name;
	for(var i=0; i < numEnemy ; i++){
        name = "enemy_"+i;
        loadObjectGLTF("zombie/scene.gltf", name, [0.04, 0.025, 0.03], [generatePosition(10, 30), 0, generatePosition(20, 40)], null);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + Math.random()*maxDistanceValue));
}