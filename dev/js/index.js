"use strict";

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))

async function index() {
    initGame();
    await delay(1000);
    loadObject("gun.json", "gun");
    await delay(1000);
    waitObjectLoaded();
    await delay(500);
    initEnemy();
    await delay(numOfEnemy*1000);
    waitEnemyLoaded();
    console.log(enemy.length);
    
    animate();
}

index();