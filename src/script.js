const debugEl = document.getElementById("debug");

let width = 0;
let height = 0;
let renderer, camera, pivot, scene, composer, clock;
let mesh, uniforms;

const size = 0.65;

let scrollSettings = {
  x: 0,
  y: 0,
};

const init3d = () => {
  console.log("init 3d");

  // add camera
  camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 1000);
  camera.position.z = 0;
  // make a scene
  scene = new THREE.Scene();
  // make a xloxk
  clock = new THREE.Clock();

  /* LIGHTS */
  const light = new THREE.AmbientLight(0x222222);
  scene.add(light);

  // create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);
  renderer.autoClear = false;

  handleWindowResize();
  // dump on page

  // ticker function
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener("resize", handleWindowResize, false);
};

// handle resize
function handleWindowResize() {
  // update height and width of the renderer and the camera
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
const init = () => {
  console.log("init");

  // create your font loader, 3dmodel loader here.
  // Then call init3d.
  // and maybe pass along any loaded assets you'd need
  init3d();
};

init();
