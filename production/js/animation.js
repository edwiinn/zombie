function generateAnimationZombie( model, animations ) {
  mixer.push(new THREE.AnimationMixer( model ));
  for ( var i = 0; i < animations.length; i++ ) {
    var clip = animations[ i ];
    var action = mixer[mixer.length-1].clipAction( clip );
    actions[model.name+clip.name ] = action;
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
  }
}

function moveXto(model,x,z,goalX,goalZ)
		{
			var timeScale = 4;
				if(!goalX || !goalZ ){//10 degree

					if(!actions[(model+"Zombie@walk_in_place")].isRunning()){
							actions[(model+"Zombie@walk_in_place")]
							.reset()
							.setEffectiveTimeScale(timeScale)
							.setEffectiveWeight( 10 )
              .play();
          }
					if(!goalZ){

							if((Math.abs(modDir[model].position.z)-Math.abs(z))<=0.5)
									goalZ=true;
							}
					if(!goalX){
							if((Math.abs(modDir[model].position.x)-Math.abs(x))<=0.5){
								goalX=true;
							}

						}
						setTimeout(function(){	moveXto(model,x,z,goalX,goalZ);},50);
			 		}
			else {
						actions[(model+"Zombie@walk_in_place")]
						.fadeOut(1);
			 	   }


}

function attackXto(model,n)
		{
      if(!actions[(model+"Zombie@attack")].isRunning()){
        playerHP -= 1;
      if(playerHP<=limitHP){
          opacity+=0.05;
          document.getElementById('screenBlood').style.opacity = opacity;
          console.log(document.getElementById('screenBlood').style.opacity);
      }
      console.log(document.getElementById('screenBlood').style.opacity);
				var timeScale=1.5;
            actions[model+"Zombie@attack"].stop();
						actions[model+"Zombie@attack"]
						.reset()
						.setEffectiveTimeScale(timeScale)
						.setEffectiveWeight(25)
						.play();
						if(n>0)
						setTimeout(function(){attackXto(model,n-1)},800);

					if(n==0)
					{
						actions[model+"Zombie@attack"].halt();
          }
      }
		}

function fallingXto(model)
		{
      if(!actions[(model+"Zombie@fallingback")].isRunning()){
					var timeScale=2;
							actions[model+"Zombie@fallingback"]
							.reset()
							.setEffectiveTimeScale (5)
              .setEffectiveWeight(40)
							.setDuration(1)
							.play();
							setTimeout(function(){
                actions[model+"Zombie@fallingback"].halt();
                actions[model+"Zombie@attack"].halt();
                actions[model+"Zombie@walk_in_place"].halt();
							},900);
               setTimeout(function(){
                 modDir[model].position.x = generatePosition(30, 90);
                 modDir[model].position.z = generatePosition(30, 90);
                 modDir[model].lookAt(new THREE.Vector3(0,0,0));
                actions[model+"Zombie@fallingback"].fadeOut(1);
                actions[model+"Zombie@attack"].fadeOut(1);
                actions[model+"Zombie@walk_in_place"].fadeOut(1);
              },1210);
            }
		}

function runFirst(model)
{
          actions[(model+"ArmatureAction")].clampWhenFinished =true;
          actions[(model+"ArmatureAction")].loop = THREE.LoopRepeat ;
            actions[(model+"ArmatureAction")]
            .reset()
            .setEffectiveTimeScale(0.5)
            .setEffectiveWeight( 10 )
            .play();

}

      function moonlight(color,scale,position,intensity,range)
      {
        var parentName = "moonlight";
        var objName ="moon";
        loaderGLTF_m = new THREE.GLTFLoader();
        loaderGLTF_m.load(
            "assets/"+"statis/moon/scene.gltf",
            function ( obj ) {
                 if(scene.getObjectByName(objName) == null){

                    var light = new THREE.DirectionalLight( 0xffffff, intensity, range );
                    light.position.set( position[0], position[1], position[2]);
                    light.castShadow = true;            // default false

                    var sphereSize = 1;
                     var tmp = new THREE.Group();
                     tmp.add(light);

                     tmp.name = parentName;
                     obj.scene.name = objName;
                     if(scale!=null){
                     obj.scene.scale.x=scale[0];
                     obj.scene.scale.y=scale[1];
                     obj.scene.scale.z=scale[2];
                     }
                     if(position!=null){
                     obj.scene.position.x=position[0];
                     obj.scene.position.y=position[1];
                     obj.scene.position.z=position[2];
                     }
                     tmp.add(obj.scene);
                     scene.add(tmp );
                     modDir[parentName]=obj.scene;
                     // console.log(objName+" have been loaded");
                     return;
                 }
            },
            function ( xhr ) {return;},
            function ( err ) {return;}

        );
      }
