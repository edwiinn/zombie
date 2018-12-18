"use strict";

async function enemyMain(){
    initEnemies();
    await delay(Math.ceil(Math.sqrt(numEnemy)) * 800);
}

async function intervalAddEnemy(){
    console.log("enemy_"+(numEnemy));
    loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy), [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], generateAnimationZombie);
    await delay(800);
    moveXto("enemy_"+(numEnemy), 0, 0, false, false);
    var newDir = new THREE.Vector3(0, 0, 0);
    modDir["enemy_"+(numEnemy)].lookAt(newDir);
    numEnemy += 1;
    movSpeed += 0.005;
    if(numEnemy == 30) clearInterval(intervalFunc);
}

function initEnemies(){
    var name;
	for(var i=0; i < numEnemy ; i++){
        name = "enemy_"+i;
        loadObjectGLTF("zombie/scene.gltf", name, [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], generateAnimationZombie);
        group.add(modDir[name]);
    }
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + Math.random()*maxDistanceValue));
}
