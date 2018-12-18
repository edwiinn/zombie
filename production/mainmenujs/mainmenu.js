// https://blog.teamtreehouse.com/the-beginners-guide-to-three-js

var stats, scene, camera, renderer, controls, sound;
var scene2, camera2, videoTexture, video;
var sceneStatus, musicStatus = 1;
var cube;
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3(), INTERSECTED;
var parentmenu;

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onDocumentMouseDown, false);

loadingPage();
init();
animate();

function init(){
  stats = initStats();
  // set up scene
  scene = new THREE.Scene();
  sceneStatus = 1;

  // Create renderer and add to DOM
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x3d3b3a, 1);
  document.body.appendChild(renderer.domElement);

  // Create camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  // Add OrbitControls so that we can pan around with the mouse.
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls = new THREE.OrbitControls(camera);
  camera.position.set(0, 0, 50);
  scene.add(camera);

  // Load plane
  // var menuTexture = new THREE.TextureLoader().load('mainmenujs/texture/stockvault-grunge-stone-wall-texture.jpg');
  var menuTexture = new THREE.TextureLoader().load('mainmenujs/texture/blood-stain-horror-texture.jpg');
  var geometry = new THREE.PlaneGeometry(150, 100);
  var material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, map: menuTexture}); //0x424447
  var plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 0, -1);
  plane.rotation.y = Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  // Spot light
  var spotLight = new THREE.SpotLight( 0xffffff, 0.65);
  spotLight.position.set(0, 10, 100);
  spotLight.penumbra = 0.2;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;

var spotLightTarget = new THREE.Object3D();
camera.add(spotLightTarget);
spotLightTarget.position.set(0, 0, 0);
spotLight.target = plane;
scene.add( spotLight );

// spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

  // Load Audio https://threejs.org/docs/index.html#api/en/audio/Audio
  var listener = new THREE.AudioListener();
  camera.add(listener);
  sound = new THREE.Audio (listener);
  var audioLoader = new THREE.AudioLoader();
  // audioLoader.load('mainmenujs/sound/Scary_Demon_Haunting.mp3', function (buffer) {
  audioLoader.load('mainmenujs/sound/hell-Mike.ogg', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(1.0);
    sound.play();
  });

  var fontLoader = new THREE.FontLoader();
  fontLoader.load('mainmenujs/fonts/helvetiker_regular.typeface.json', function(font){
    // start
    var textstart = new THREE.TextGeometry('Start', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 1,

    });

    textstart.computeBoundingBox();
    var textMaterial = new THREE.MeshLambertMaterial({color: 0xede2dc}); // color 0xd40a2e
    text = new THREE.Mesh(textstart, textMaterial);
    text.position.x = 2; text.position.y = 0; text.position.z = 0;
    // credits
    var textcredit = new THREE.TextGeometry('Credits', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 1,

    });
    textcredit.computeBoundingBox();
    var textCreditMaterial = new THREE.MeshLambertMaterial({color: 0xede2dc}); // 0xd40a2e
    text2 = new THREE.Mesh(textcredit, textCreditMaterial);
    text2.position.x = 0; text2.position.y = -15; text2.position.z = 0;
    text2.userData.name = 'credits';

    var textmusicon = new THREE.TextGeometry('Music: ON', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 1,

    });

    var textMusicOnMaterial = new THREE.MeshLambertMaterial({color: 0xede2dc}); // 0xd40a2e
    text4 = new THREE.Mesh(textmusicon, textMusicOnMaterial);
    text4.position.x = -2; text4.position.y = -7; text4.position.z = 0;
    text4.userData.name = 'musicon';

    var textmusicoff = new THREE.TextGeometry('Music: OFF', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 1,

    });

    var textMusicOffMaterial = new THREE.MeshLambertMaterial({color: 0xede2dc}); // 0xd40a2e
    text5 = new THREE.Mesh(textmusicoff, textMusicOffMaterial);
    text5.position.x = -3; text5.position.y = -7; text5.position.z = 0;
    text5.userData.name = 'musicoff';
    text5.visible = false;

    parentmenu = new THREE.Object3D();
    parentmenu.add(text);
    parentmenu.add(text2);
    parentmenu.add(text4);
    parentmenu.add(text5);
    scene.add(parentmenu);
  });

fontLoader.load('mainmenujs/fonts/Something_Strange_Regular.json', function(font){
  var texttitle = new THREE.TextGeometry('Fear in The Dark', {
    font: font,
    size: 5,
    height: 2,
  });

  var textTitleMaterial = new THREE.MeshLambertMaterial({color: 0xea1409}); //0xc60909
  text3 = new THREE.Mesh(texttitle, textTitleMaterial);
  text3.position.x = -10; text3.position.y = 8; text3.position.z = 0;

  parenttitle = new THREE.Object3D();
  parenttitle.add(text3);

  scene.add(parenttitle);
});

/*------------------------- Scene 2 --------------------------------*/
    // Create new Scene2
    scene2 = new THREE.Scene();

  // Spotlight
  var spotLight2 = new THREE.SpotLight(0xffffff);
  spotLight2.position.set(10, 0, 60);
  scene2.add(spotLight2);

  camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera2.position.set(0, 0, 50);
  scene2.add(camera2);

  video = document.getElementById('videoSeoul');
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  geometry = new THREE.PlaneGeometry(60, 30);
  videoMaterial = new THREE.MeshLambertMaterial({map: videoTexture});
  videoMesh = new THREE.Mesh(geometry, videoMaterial);
  videoMesh.position.set(0, 5, 2);
  scene2.add(videoMesh);

  var bloodTexture = new THREE.TextureLoader().load('mainmenujs/texture/stockvault-grunge-stone-wall-texture.jpg');

  var geometry2 = new THREE.PlaneGeometry(150, 100);
  var material2 = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, map: bloodTexture}); //0x424447
  var plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(0, 0, -1);
  plane2.receiveShadow = true;
  scene2.add(plane2);


  fontLoader.load('mainmenujs/fonts/Blood_Lust_Regular.json', function(font){
        var textback = new THREE.TextGeometry('Created By: Edwin (109), Taufiq (016), Rahma (117), Natasha (183)', {
          font: font,
          size: 4,
          height: 2,
          curveSegments: 2,
          bevelEnabled: true,
          bevelThickness: 0.2,
          bevelSize: 0.2,
          bevelSegments: 5,

        });

        var textBackMaterial = new THREE.MeshPhongMaterial({color: 0xdb160f});
        text6 = new THREE.Mesh(textback, textBackMaterial);
        text6.position.x = 30; text6.position.y = -15; text6.position.z = 0;
        text6.userData.name = 'createdby';
        parentcredit = new THREE.Object3D();
        parentcredit.add(text6);

        scene2.add(parentcredit);
  });

  // controls = new THREE.OrbitControls(camera);
  console.log('terserah');
}

function animate(){
  stats.update();
  requestAnimationFrame(animate);
  // controls.update();
  render();
  checkScene();

}
var t = 0;
function render(){

  if (sceneStatus == 1) renderer.render(scene, camera);
  else if (sceneStatus == 2) {
    renderer.render(scene2, camera2);
    text6.position.x -= 0.1;
  }

}

function initStats(){
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '5px';
  stats.domElement.style.top = '0px';

  document.getElementById("Stats-output").appendChild(stats.domElement);
  return stats;
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event){
  event.preventDefault();
  mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.0002;
    camera.position.y += (mouseY - camera.position.y) * 0.0002;
    //set up camera position
    camera.lookAt(scene.position);

    mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


  // raycaster find intersections
  raycaster.setFromCamera( mouseVector, camera );
  var intersects = raycaster.intersectObjects(parentmenu.children);
  if (intersects.length > 0){
    if (INTERSECTED != intersects[0].object){
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.material.color.getHex());
      INTERSECTED = intersects[0].object;
      console.log(INTERSECTED);
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.setHex(0xd40a2e);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }
}

function onDocumentMouseDown(event){
  event.preventDefault();
  mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVector, camera);
    var intersects = raycaster.intersectObjects(parentmenu.children);
    if (intersects.length > 0) {
      if (intersects[0].object.userData.name == "credits"){
      sceneStatus = 2;
      text.visible = false; text2.visible = false;
      video.play();
    }
    else if (intersects[0].object.userData.name == "musicon"){
      text4.visible = false; text5.visible = true;
      musicStatus = 0;
      if (musicStatus == 0) sound.pause();
    }
    else if (intersects[0].object.userData.name == "musicoff"){
      text4.visible = true; text5.visible = false;
      musicStatus = 1;
      if (musicStatus == 1) sound.play();
    }
    }
}

function loadingPage(){
  var img = document.createElement("img");
  img.setAttribute("src", "http://1.bp.blogspot.com/-P12RJWD48B8/UI_-Pg19KeI/AAAAAAAAAlc/0jCpFfMhb_M/s1600/loading.gif");
  img.setAttribute("width", window.innerWidth);
  img.setAttribute("height", window.innerHeight);
  img.setAttribute("alt", "Loading");
  img.setAttribute("id", "loading");
  var divimg = document.getElementById('loading');
  divimg.appendChild(img);

  setTimeout(function(){
    img.style.display = "none";
  }, 5000);

}

function creditBack(){
  sceneStatus = 1;
  text.visible = true; text2.visible = true;
  video = document.getElementById('videoSeoul');
  video.pause();

  if (musicStatus == 1) {
    sound.play();
    text4.visible = true;
    text5.visible = false;
  }
  else if (musicStatus == 0) {
    sound.pause();
    text4.visible = false;
    text5.visible = true;
  }
}

function checkScene(){
  if (sceneStatus == 1){
    var backBtn = document.getElementById('backButton');
    backBtn.style.visibility = "hidden";
    video = document.getElementById('videoSeoul');
    video.pause();
  }
  else if (sceneStatus == 2) {
    sound.pause();
    var backBtn = document.getElementById('backButton');
    backBtn.style.visibility = "visible";
  }
}
