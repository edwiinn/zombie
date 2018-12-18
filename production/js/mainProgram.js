"use strict";

async function main() {
    initGame();
    await delay(5000);
    document.getElementById('skorboard').style.display = "block";
    document.getElementById('hpboard').style.display = "block";
    document.getElementById('image-loading').style.display = "none";
    // game start
    animate();
}

main();
