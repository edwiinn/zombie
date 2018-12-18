"use strict";

async function intervalAddEnemy(){
    console.log("enemy_"+(numEnemy));
    loadObjectGLTF("zombie/scene.gltf", "enemy_"+(numEnemy), [0.04, 0.025, 0.03], [generatePosition(30, 90), 0, generatePosition(30, 90)], generateAnimationZombie);
    await delay(800);
    moveXto("enemy_"+(numEnemy), 0, 0, false, false);
    var newDir = new THREE.Vector3(0, 0, 0);
    group.add(modDir["enemy_"+(numEnemy)]);
    modDir["enemy_"+(numEnemy)].lookAt(newDir);
    numEnemy += 1;
    movSpeed += 0.005;
    if(numEnemy == 10) clearInterval(intervalFunc);
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function generatePosition(minValue, maxDistanceValue){
	return (getSign() * (minValue + Math.random()*maxDistanceValue));
}
