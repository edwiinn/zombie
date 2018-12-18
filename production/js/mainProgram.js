"use strict";

async function main() {
    initGame();
    await delay(5000);

    // main menu

    // load enemy
    enemyMain();
    
    // game start
    animate();
}

main();