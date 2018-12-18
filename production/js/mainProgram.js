"use strict";

async function main() {
    initGame();
    await delay(5000);
    document.getElementById('skorboard').style.display = "block";
    document.getElementById('hpboard').style.display = "block";
    document.getElementById('image-loading').style.display = "none";
    // game start
    audioLoader.load( 'assets/soundThema.mp3', function( buffer ) {
                soundThema.setBuffer( buffer );
                soundThema.setLoop( true);
                soundThema.setVolume( 0.3);
                soundThema.play();
            });
    animate();
}

function reloadBack()
{
	document.location.reload(true);
}

main();
