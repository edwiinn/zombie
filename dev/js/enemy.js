"use strict";

var enemy = [];
var numOfEnemy = 1;
var minRadius = 200;

function initEnemy(){    // Auto run function
	var name;
    for(var i=0; i < numOfEnemy; i++){
		name = "enemy"+i;
		if(scene.getObjectByName(name) == null)
			loadObject("enemy.json", name);
    }
};

function generateEnemyPosition(){
	var xsign = 0, zsign = 0;
	if(Math.random()%2 == 0){xsign=1;}
	else{xsign=-1;}
	if(Math.random()%2 == 0){zsign=1;}
	else{zsign=-1;}
	return THREE.Vector3(camera.position.x+(minRadius+150)*xsign,0,camera.position.z+(minRadius+150)*zsign);
}

function waitObjectLoaded(){
    enemy = [];
	var instance, name;
	for(var i=0; i < numOfEnemy && camera != null; i++){
		name = "enemy"+i;
		instance = scene.getObjectByName(name);
		if(instance != null){
			instance.position.set(generateEnemyPosition());
			enemy.push( instance );
		}
    }
	if(enemy.length == numOfEnemy){ // initialize loaded object
        for(var i=0; i < numOfEnemy; i++){
			scene.add( enemy[i] );
		}
    }
}