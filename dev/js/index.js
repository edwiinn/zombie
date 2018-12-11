"use strict";

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))

async function index() {
    initGame();
    // animate();
    await delay(1000);
    loadObject("gun.json", "gun");
    await delay(1000);
    waitGunLoaded();
    await delay(500);
    loadObject("robot.json", "baseEnemy");
    await delay(1000);
    waitEnemyLoaded();
    await delay(numOfEnemy*1000);
    waitEnemyLoaded();
    await delay(500);
    var t = scene.getObjectByName("baseEnemy");
    await delay(500);
    t.translateZ(-100);
    await delay(200);
    animate();
}

index();