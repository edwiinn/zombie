"use strict";

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))

async function index() {
    initGame();
    animate();
    await delay(1000);
    loadObject("gun.json", "gun");
    await delay(1000);
    waitGunLoaded();
    await delay(500);
    loadObject("monster.js", "baseEnemy");
    await delay(1000);
    waitEnemyLoaded();
    await delay(numOfEnemy*1000);
    waitEnemyLoaded();
    await delay(500);
    // animate();
}

index();