"use strict";

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration))

async function index() {
    initGame();
    await delay(500);
    enemyMain();
    await delay(2000);
 
    await delay(200);
    animate();
}

index();