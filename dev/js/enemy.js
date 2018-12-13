"use strict";

var enemy = [];
var numOfEnemy =2;
var minRadius = 200;

function generateEnemyPosition(){
	var xsign = 0, zsign = 0;
	if(Math.random()%2 == 0){xsign=1;}
	else{xsign=-1;}
	if(Math.random()%2 == 0){zsign=1;}
	else{zsign=-1;}
	return new THREE.Vector3(camera.position.x+(minRadius+150)*xsign,0,camera.position.z+(minRadius+150)*zsign);
}

function getSign(){
	return (Math.ceil( (100 * Math.random()) )%2 ) ? -1: 1;
}

function waitEnemyLoaded(){
    enemy = [];
	var instance, name;
	while(scene.getObjectByName("baseEnemy")==undefined);
	var tmp =scene.getObjectByName("baseEnemy");
	for(var i=0; i < numOfEnemy && camera != null; i++){
		name = "enemy"+i;
		instance = tmp.clone();
		instance.name = name;
		instance.position.x = camera.position.x+(minRadius+150) * getSign();
		instance.position.z = camera.position.z+(minRadius+150) * getSign();
		// instance.position.set(generateEnemyPosition());
		// enemy.push( instance );
		scene.add(instance);
    }
}
