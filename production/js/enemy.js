"use strict";

async function enemyMain(){
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

function intervalAddEnemy(){
    loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy-1), [0.04, 0.025, 0.03], [generatePosition(60, 120), 0, generatePosition(60, 120)], null);
    numEnemy += 1;
    console.log(numEnemy);
}

function initEnemies(){
    var name;
	for(var i=0; i < numEnemy ; i++){
        name = "enemy_"+i;
        loadObjectGLTF("zombie/scene.gltf", name, [0.04, 0.025, 0.03], [generatePosition(60, 120), 0, generatePosition(60, 120)], null);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + Math.random()*maxDistanceValue));
}