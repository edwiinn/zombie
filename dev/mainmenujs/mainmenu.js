// https://blog.teamtreehouse.com/the-beginners-guide-to-three-js

var stats, scene, camera, renderer;
var cube;
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3(), INTERSECTED;
var parentmenu;

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onDocumentMouseMove, false);

init();
animate();

function init(){
  stats = initStats();
  // set up scene
  scene = new THREE.Scene();

  // Create renderer and add to DOM
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333F47, 1);
  document.body.appendChild(renderer.domElement);

  // Create camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 50);
  scene.add(camera);

  //Create axes
  var axes = new THREE.AxesHelper(5);
  scene.add(axes);

  // Hemisphere light
  var hLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
  scene.add(hLight);

  // Create light
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100, 200, 100);
  scene.add(light);

  // Load mesh
  // var loader = new THREE.JSONLoader();
  // loader.load("mainmenujs/treehouse_logo.js", function(geometry){
  //   var material = new THREE.MeshLambertMaterial({color: 0x55B663});
  //   mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);
  // });

  // https://github.com/jeromeetienne/threex.text
  // https://jeromeetienne.github.io/slides/howtomakeagame-nextgamefrontier-2014/#27
  // https://threejs.org/docs/index.html#api/en/geometries/TextGeometry
  var fontLoader = new THREE.FontLoader();
  fontLoader.load('mainmenujs/fonts/helvetiker_regular.typeface.json', function(font){
    var textstart = new THREE.TextGeometry('Start', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 1,
      // steps: 1
    });
    // text.position.z = -100;
    // text.position.y = 100;
    // scene.add(text); // TIDAK JALAN (?)

    // https://talk.olab.io/t/three-js-dat-gui-to-control-and-3d-text-geometry/208
    textstart.computeBoundingBox();
    var textMaterial = new THREE.MeshLambertMaterial({color: 0xff003c}); // color 0xd40a2e
    text = new THREE.Mesh(textstart, textMaterial);
    text.position.x = 2; text.position.y = 0; text.position.z = 0;
    // text.rotation.x = -45;
    // text.rotation.y = Math.PI * 2;

    var textcredit = new THREE.TextGeometry('Credits', {
      font: font,
      size: 3,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 1,
      // steps: 1
    });
    textcredit.computeBoundingBox();
    var textCreditMaterial = new THREE.MeshLambertMaterial({color: 0xd40a2e});
    text2 = new THREE.Mesh(textcredit, textCreditMaterial);
    text2.position.x = 0; text2.position.y = -10; text2.position.z = 0;
    parentmenu = new THREE.Object3D();
    parentmenu.add(text);
    parentmenu.add(text2);
    scene.add(parentmenu);

  });

fontLoader.load('mainmenujs/fonts/Something_Strange_Regular.json', function(font){
  var texttitle = new THREE.TextGeometry('Fear in The Dark', {
    font: font,
    size: 5,
    height: 2,
  });
  // var texttitle2 = new THREE.TextGeometry('The Dark', {
  //   font: font,
  //   size: 5,
  //   height: 2,
  // });
  var textTitleMaterial = new THREE.MeshLambertMaterial();
  text3 = new THREE.Mesh(texttitle, textTitleMaterial);
  text3.position.x = -10; text3.position.y = 8; text3.position.z = 0;
  // text4 = new THREE.Mesh(texttitle2, textTitleMaterial);
  // text4.position.x = -10; text4.position.y = 6; text4.position.z = 0;
  parenttitle = new THREE.Object3D();
  parenttitle.add(text3);
  // parent.add(text4);
  scene.add(parenttitle);
});

//   var fontLoader = new THREE.FontLoader();
//   var font = fontLoader.load('mainmenujs/fonts/helvetiker_bold.typeface.json',
//     function (font){ scene.add(font);}, //onLoad callback
//     function(xhr) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );}, //onProgress callback
//     function(err) {console.log( 'An error happened' );}
// );

  // var text2  = new THREEx.Text('Hello');
  // text2.scale.multiplyScalar(1/2);
  // scene.add(text2);



  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
cube.position.x = 100;
scene.add( cube );

  // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

// https://medium.com/@PavelLaptev/three-js-for-beginers-32ce451aabda
    // raycaster = new THREE.Raycaster();
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function animate(){
  stats.update();
  requestAnimationFrame(animate);
  render();

  controls.update();
}
function render(){
  cube.rotation.x += 0.01;

  // raycaster find intersections
  raycaster.setFromCamera( mouseVector, camera );
  var intersects = raycaster.intersectObjects(parentmenu.children);
  if (intersects.length > 0){
    if (INTERSECTED != intersects[0].object){
      // if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.material.color.getHex());
      INTERSECTED = intersects[0].object;
      console.log(INTERSECTED);
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      // INTERSECTED.material.emmisive.setHex(0xff0000);
      INTERSECTED.material.color.setHex(0xffffff);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }

  // if ( intersects.length > 0 ) {
  //   var res = intersects.filter( function ( res ) {
  //     return res && res.object;
  //   })[ 0 ];
  //   if ( res && res.object ) {
  //     selectedObject = res.object;
  //     selectedObject.material.color.set( '#f00' );
  //   }
  // }

  renderer.render(scene, camera);
}

// from book Learning Three.js
function createMesh(geometry){
  var meshMaterial = new THREE.MeshNormalMaterial();
  meshMaterial.side = THREE.DoubleSide;
  var wireFrameMaterial = new THREE.MeshBasicMaterial();
  wireFrameMaterial.wireframe = true;

  var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [meshMaterial, wireFrameMaterial]);
  return mesh;
}

function initStats(){
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("Stats-output").appendChild(stats.domElement);
  return stats;
}

// https://medium.com/@PavelLaptev/three-js-for-beginers-32ce451aabda
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
function onDocumentMouseMove(event){
  event.preventDefault();
  // mouseX = event.clientX - window.innerWidth / 2;
  //   mouseY = event.clientY - window.innerHeight / 2;
    // camera.position.x += (mouseX - camera.position.x) * 0.005;
    // camera.position.y += (mouseY - camera.position.y) * 0.005;
    // //set up camera position
    // camera.lookAt(scene.position);

    mouseVector.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseVector.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

/*
  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouseVector, camera );
  var intersects = raycaster.intersectObjects(parentmenu.children);
  if (intersects.length > 0){
    if (INTERSECTED != intersects[0].object){
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emmisive.setHex(0xff0000);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }
  // var intersects = getIntersects(event.layerX, event.layerY);
*/
}


function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;

  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( parentmenu, true );
}
