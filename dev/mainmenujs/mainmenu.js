// https://blog.teamtreehouse.com/the-beginners-guide-to-three-js

var stats, scene, camera, renderer;

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
  var axes = new THREE.AxisHelper(5);
  scene.add(axes);

  // Hemisphere light
  var hLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
  scene.add(hLight);

  // Create light
  var light = new THREE.PointLight(0xffffff);
  light.position.set(-10, 20, 10);
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
      size: 5,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.4,
      bevelSize: 0.2,
      bevelSegments: 1,
      // steps: 1
    });
    // text.position.z = -100;
    // text.position.y = 100;
    // scene.add(text); // TIDAK JALAN (?)

    // https://talk.olab.io/t/three-js-dat-gui-to-control-and-3d-text-geometry/208
    // text3d.computeBoundingBox();
    var textMaterial = new THREE.MeshLambertMaterial({color: 0xff003c}); // color 0xd40a2e
    text = new THREE.Mesh(textstart, textMaterial);
    text.position.x = 2; text.position.y = 0; text.position.z = 0;
    // text.rotation.x = -45;
    // text.rotation.y = Math.PI * 2;

    var textcredit = new THREE.TextGeometry('Credit', {
      font: font,
      size: 5,
      height: 2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.4,
      bevelSize: 0.2,
      bevelSegments: 1,
      // steps: 1
    });
    text2 = new THREE.Mesh(textcredit, textMaterial);
    text2.position.x = 0; text2.position.y = -10; text2.position.z = 0;
    parent = new THREE.Object3D();
    parent.add(text);
    parent.add(text2);
    scene.add(parent);
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
}
var cube;

function animate(){
  stats.update();
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;

  renderer.render(scene, camera);
  controls.update();
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
