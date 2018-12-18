function generateAnimationZombie( model, animations ) {
  mixer.push(new THREE.AnimationMixer( model ));
  for ( var i = 0; i < animations.length; i++ ) {
    var clip = animations[ i ];
    console.log(clip.name);
    var action = mixer[mixer.length-1].clipAction( clip );
    actions[model.name+clip.name ] = action;
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
  }
  console.log("done animation for"+model.name);
}

function moveXto(model,x,z,goalX,goalZ)
		{

			var timeScale = 4;
				if(!goalX || !goalZ || anglePlayer-modDir[model].rotation.y>=0.17){//10 degree

					if(!actions[(model+"Zombie@walk_in_place")].isRunning()){
							actions[(model+"Zombie@walk_in_place")]
							.reset()
							.setEffectiveTimeScale(timeScale)
							.setEffectiveWeight( 10 )
              .play();
          }
					if(!goalZ){

							if((Math.abs(modDir[model].position.z)-Math.abs(z))>=0)
									goalZ=true;
							}
					if(!goalX){
							if((Math.abs(modDir[model].position.x)-Math.abs(x))>=0){
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

  function moveYto(model,x,z,goalX,goalZ)
    		{
    			var stepX;
    			if(x>modDir[model].position.x)
    			stepX = 0.1;
    			else
    			stepX = -0.1;

    			var stepZ;
    			if(z>modDir[model].position.z)
    			stepZ = 0.1;
    			else
    			stepZ = -0.1;
    			var timeScale = 1;

    				if(!goalX || !goalZ || anglePlayer-modDir[model].rotation.y>=0.17){//10 degree

    					if(!actions[(model+"mixamo.com")].isRunning()){
                  actions[(model+"mixamo.com")]
                  .reset()
                  .setEffectiveTimeScale(timeScale)
    							.setEffectiveWeight( 10 )
    							.play();
                }
    					if(!goalZ){

    							modDir[model].position.z += stepZ;
    							if((Math.abs(modDir[model].position.z)-Math.abs(z))>=0)
    									goalZ=true;
    							}
    					if(!goalX){
    							modDir[model].position.x += stepX;
    							if((Math.abs(modDir[model].position.x)-Math.abs(x))>=0)
    								goalX=true;
    						}
                if((anglePlayer-modDir[model].rotation.y)>0)
                modDir[model].rotation.y +=(1/180)*3.14;
                else if ((anglePlayer-modDir[model].rotation.y)<0)
                modDir[model].rotation.y -=(1/180)*3.14;

    						setTimeout(function(){	moveYto(model,x,z,goalX,goalZ);},200);
    			 		}
    			else {
    						actions[(model+"mixamo.com")]
    						.fadeOut(1);
    			 	   }


    		}

function attackXto(model,n)
		{
      if(!actions[(model+"Zombie@attack")].isRunning()){
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
								//tambah efek kebakar(opsional)
							},900);
              // setTimeout(function(){scene.remove(scene.getObjectByName(model));
              // },2891);
            }
				//need disapear;
		}

    function fallingYto(model)
    		{

          actions[(model+"mixamo.com")]
          .reset()
          .setEffectiveTimeScale(1)
          .setDuration(20)
          .setEffectiveWeight( 10 )
          .play();
          setTimeout(function(){
            actions[model+"Zombie@fallingback"]
            .halt();
            //tambah efek kebakar(opsional)
          },2900);
                  setTimeout(function(){scene.remove(scene.getObjectByName(model));
                  },3000);

    				//need disapear;
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

function moveBatto(model,loc,inisialGoal,angleEnd)
      {
        angleEndRad =(angleEnd/360)*6.28;
        var x=loc[0];
        var y=loc[1];
        var z=loc[2];

        var stepX;
        if(x>modDir[model].position.x)
        stepX = 0.01;
        else
        stepX = -0.01;

        var stepZ;
        if(z>modDir[model].position.z)
        stepZ = 0.01;
        else
        stepZ = -0.01;

        var stepY;
        if(y>modDir[model].position.y)
        stepY = 0.01;
        else
        stepY = -0.01;

          if(!inisialGoal[0] || !inisialGoal[2] || !inisialGoal[1] || angleEndRad-modDir[model].rotation.y>=0.1){//10 degree

            if(!inisialGoal[2]){
                modDir[model].position.z += stepZ;
                if((Math.abs(modDir[model].position.z)-Math.abs(z))>=0)
                    inisialGoal[2]=true;
                }
            if(!inisialGoal[0]){
                modDir[model].position.x += stepX;
                if((Math.abs(modDir[model].position.x)-Math.abs(x))>=0)
                  inisialGoal[1]=true;
                }
            if(!inisialGoal[1]){
                    modDir[model].position.x += stepY;
                    if((Math.abs(modDir[model].position.y)-Math.abs(y))>=0)
                    inisialGoal[1]=true;
                    }

            if((angleEndRad-modDir[model].rotation.y)>0)
                modDir[model].rotation.y +=(1/180)*3.14;
          else if ((angleEndRad-modDir[model].rotation.y)<0)
                    modDir[model].rotation.y -=(1/180)*3.14;

              setTimeout(function(){	moveBatto(model,loc,inisialGoal,angleEnd);},10);
            }


      }

      function moonlight(color,scale,position,intensity,range)
      {
        var parentName = "moonlight";
        var objName ="moon";
        loaderGLTF_m = new THREE.GLTFLoader();                  //position =[[x],[y],[z]]
        loaderGLTF_m.load(                                     //scale =[[x],[y],[z]]
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
                     console.log(objName+" have been loaded");
                     return;
                 }
            },
            function ( xhr ) {return;},
            function ( err ) {return;}

        );
      }
