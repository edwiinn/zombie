"use strict";

async function main() {
    initGame();
    await delay(5000);
    document.getElementById('image-loading').style.display = "none";
    // game start
    animate();
}

main();
