function generateAnimationZombieX( model, animations ) {
  var states = [ 'Zombie@attack', 'Zombie@fallingback', 'Zombie@idle', 'Zombie@walk', 'Zombie@walk_in_place' ];
  mixer = new THREE.AnimationMixer( model );
  console.log(animations);
  for ( var i = 0; i < animations.length; i++ ) {
    var clip = animations[ i ];
    console.log(clip.name);
    var action = mixer.clipAction( clip );
    actions[model.name+clip.name ] = action;
    if (states.indexOf( clip.name ) != 7) {
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
    }
  }
  console.log("done");
}

function moveto(model,x,z,goalX,goalZ)
		{
      console.log(modDir[model].position);
			var stepX;
			if(x>modDir[model].position.x)
			stepX = 0.2;
			else
			stepX = -0.2;

			var stepZ;
			if(z>modDir[model].position.z)
			stepZ = 0.2;
			else
			stepZ = -0.2;

			var timeScale = 4;
      console.log(playeragle,modDir[model].rotation.y);
				if(!goalX && !goalZ || playeragle-modDir[model].rotation.y>=0.17){//10 degree

					if(!actions[(model+"Zombie@walk_in_place")].isRunning()){
							actions[(model+"Zombie@walk_in_place")]
							.reset()
							.setEffectiveTimeScale(timeScale)
							.setEffectiveWeight( 10 )
							.play()
					if(!goalZ){

							modDir[model].position.z += stepZ;
							if((Math.abs(modDir[model].position.z)-Math.abs(z))>=0)
									goalZ=true;
							}
					if(!goalX){
							modDir[model].position.x += stepX;
							if((Math.abs(modDir[model].position.x)-Math.abs(x))>=0){
								goalX=true;
							}

						}

					}
						setTimeout(function(){	moveto(model,x,z,goalX,goalZ);},50);
			 		}
			else {
						actions[(model+"Zombie@walk_in_place")]
						.fadeOut(1);
			 	   }
        if((playeragle-modDir[model].rotation.y)>0)
        modDir[model].rotation.y +=(1/180)*3.14;
        else if ((playeragle-modDir[model].rotation.y)<0)
        modDir[model].rotation.y -=(1/180)*3.14;

		}

function attackto(model,n)
		{
				var timeScale=1.5;
						actions[model+"Zombie@attack"]
						.reset()
						.setEffectiveTimeScale(timeScale)
						.setEffectiveWeight(25)
						.play();

						console.log(n);
						if(n>0)
						setTimeout(function(){attackto(model,n-1)},800);

					if(n==0)
					{
						actions[model+"Zombie@attack"].halt();
					}
					console.log(n);
		}

function fallingto(model)
		{
					var timeScale=2;
							console.log()
							actions[model+"Zombie@fallingback"]
							.reset()
							.setEffectiveTimeScale (3)
              .setEffectiveWeight(40)
							.setDuration(3)
							.play();
							setTimeout(function(){
                actions[model+"Zombie@fallingback"]
                .halt();
								//tambah efek kebakar(opsional)
							},2890);
              setTimeout(function(){scene.remove(zombie);
              },2890);

				//need disapear;
		}
