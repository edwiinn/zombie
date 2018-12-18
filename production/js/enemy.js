"use strict";

async function enemyMain(){
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

function intervalAddEnemy(){
    loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy-1), [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], null);
    numEnemy += 1;
    movSpeed += 0.005;
}

function initEnemies(){
    var name;
	for(var i=0; i < numEnemy ; i++){
        name = "enemy_"+i;
        loadObjectGLTF("zombie/scene.gltf", name, [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], generateAnimationZombie);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + Math.random()*maxDistanceValue));
}