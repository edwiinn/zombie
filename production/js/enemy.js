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
    loadObjectGLTF("zombie_y/scene_type1.glb", "baseEnemy2", "enemyModel2", [0.04, 0.025, 0.03], [0, 0, 0], null);
    loadObjectGLTF("zombie_y/scene_type2.glb", "baseEnemy3", "enemyModel3", [0.04, 0.025, 0.03], [0, 0, 0], null);
    loadObjectGLTF("zombie_y/scene_type3.glb", "baseEnemy4", "enemyModel4", [0.04, 0.025, 0.03], [0, 0, 0], null);
}

function initEnemies(){
    var instance, name;
    var tmp1 = modDir["baseEnemy1"];
    var tmp2 = modDir["baseEnemy2"];
    var tmp3 = modDir["baseEnemy3"];
    var tmp4 = modDir["baseEnemy4"];
    
	for(var i=0; i < numEnemy ; i++){
        name = "enemy_"+i;
        console.log(i);
        if(i%4 == 0) instance = tmp1.clone();
        else if(i%4 == 1) instance = tmp2.clone();
        else if(i%4 == 2) instance = tmp3.clone();
        else if(i%4 == 3) instance = tmp4.clone();
		instance.name = name;
		instance.position.x = (generatePosition(0.1, 0.2));
        instance.position.z = (generatePosition(0.1, 0.2));
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

