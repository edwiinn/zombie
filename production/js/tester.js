//not include if done
document.addEventListener('keydown', (event) => {
    switch (event.key){
        case '1':
          //attackXto("mymodel",1);
            attackXto("enemy_1",4);
            moonlight.position.y +=1;
            break;
        case '2':

            // camera.translateX(movSpeed * deltaTime);
            break;
        case '3':
          moveXto("mymodel",-5,5,false,false);
          //attackto("mymodel",10);

            // camera.translateY((-1) * movSpeed * deltaTime);
            break;
        case '4':
          modDir["mymodel2"].position.z -= 0.1;
          fallingXto("mymodel");
          fallingYto("mymodel2");
          fallingYto("mymodel3");
            // camera.translateX((-1) * movSpeed * deltaTime);
            break;

            case '5':
              moveYto("mymodel4",-5,5,false,false);
              //moveYto("mymodel2",2,2,false,false);
              console.log(modDir);
                // camera.translateX((-1) * movSpeed * deltaTime);
            break;

            case '6':

              runFirst("bat");
              runFirst("bat1");
              runFirst("bat2");
              moveBatto("bat1",[-4,4,4],[false,false,false],180);
              console.log(modDir);
                // camera.translateX((-1) * movSpeed * deltaTime);
            break;
        default:
            break;
    }
});
