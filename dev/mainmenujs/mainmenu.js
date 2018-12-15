// https://blog.teamtreehouse.com/the-beginners-guide-to-three-js

var scene, camera, renderer;

init();
animate();

function init(){
  // set up scene
  scene = new THREE.Scene();

  // Create renderer and add to DOM
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x333F47, 1);
  document.body.appendChild(renderer.domElement);

  // Create camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 6, 0);
  scene.add(camera);

  // Create light
  var light = new THREE.PointLight(0xffffff);
  light.position.set(-100, 200, 100);
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
  fontLoader.load('mainmenujs/fonts/gentilis_regular.typeface.json', function(font){
    var text = createMesh(new THREE.TextGeometry('Hello three.js!', {
      font: font,
      size: 10,
      height: 10,
      weight: 'normal',
      style: 'normal',
      // curveSegments: 2,
      // bevelEnabled: true,
      // bevelThickness: 2,
      // bevelSize: 4,
      // bevelSegments: 3,
      // steps: 1
    }));
    // text.position.z = -100;
    // text.position.y = 100;
    scene.add(text); // TIDAK JALAN (?)
  });

//   var fontLoader = new THREE.FontLoader();
//   var font = fontLoader.load('mainmenujs/fonts/helvetiker_bold.typeface.json',
//     function (font){ scene.add(font);}, //onLoad callback
//     function(xhr) {console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );}, //onProgress callback
//     function(err) {console.log( 'An error happened' );}
// );

  // var text2  = new THREEx.Text('Hello World');
  // scene.add(text2);



  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
scene.add( cube );

  // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}
var cube;

function animate(){
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
