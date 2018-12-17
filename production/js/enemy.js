"use strict";

// createBaseEnemy: create base model of enemy. Must be finished before running initEnemies
// initEnemies: clone from base model of enemy. Generate random position over X and Z plane
// getEnemiesReference: Add reference to global variable 'enemies'

async function enemyMain(){
    createBaseEnemy();
    await delay(1000);
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

function createBaseEnemy(){
    loadObjectGLTF("zombie_k/scene.gltf", "baseEnemy", "enemyModel", [0.04, 0.025, 0.03], [0, 0, 0], null);

}

function initEnemies(){
    var instance, name;
    var tmp = modDir["baseEnemy"];
	for(var i=0;tmp != null && i < numEnemy && camera != null; i++){ // NOTE: change camera into player if needed
		name = "enemy_"+i;
		instance = tmp.clone();
		instance.name = name;
		instance.position.x = camera.position.x + (generatePosition(150, 200));
        instance.position.z = camera.position.z + (generatePosition(150, 200));
        modDir[name] = instance;
		scene.add(instance);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + maxDistanceValue));
}

