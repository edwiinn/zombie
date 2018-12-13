"use strict";


async function index() {
    initGame();
    await delay(500);
    enemyMain();
    await delay(2000);
    console.log(enemies);
    
    await delay(200);
    animate();
}

index();