import * as THREE from "../dist/vendor/threejs/three.module.js";

import { EffectComposer } from "../dist/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../dist/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "../dist/jsm/postprocessing/FilmPass.js";
import { BloomPass } from "../dist/jsm/postprocessing/BloomPass.js";

const debugEl = document.getElementById("debug");

let width = 0;
let height = 0;
let renderer, camera, pivot, scene, composer, clock;
let mesh, uniforms;

const size = 0.65;

let scrollSettings = {
  x: 0,
  y: 0,
  lightStrength: 3,
};

const init3d = (fontModel) => {
  console.log("init 3d", fontModel);

  console.log('404');
  // add camera
  camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 1000);
  console.log('404');
  // camera.position.y = 7;
  camera.position.z = 0;
  // point camera
  // camera.position.set(0, 10, -25);
  // camera.lookAt(scene.position);
  
  console.log('404');
  scene = new THREE.Scene();

  console.log('404');
  clock = new THREE.Clock();

  // SHADER
  console.log('404');

  var textureLoader = new THREE.TextureLoader();

  uniforms = {
    fogDensity: { value: 0.45 },
    fogColor: { value: new THREE.Vector3(0, 0, 0) },
    time: { value: 1.0 },
    uvScale: { value: new THREE.Vector2(3.0, 1.0) },
    texture1: { value: textureLoader.load("textures/lava/cloud.png") },
    texture2: { value: textureLoader.load("textures/lava/lavatile.jpg") },
  };

  uniforms["texture1"].value.wrapS = uniforms["texture1"].value.wrapT = THREE.RepeatWrapping;
  uniforms["texture2"].value.wrapS = uniforms["texture2"].value.wrapT = THREE.RepeatWrapping;

  var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });
  // TEXT
  console.log('404');

  var textGeo = new THREE.TextGeometry("MEPHYSTO.iO", {
    font: fontModel,
    size: 15,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 4,
    bevelSize: 2,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeo.computeBoundingBox();
  console.log(textGeo.boundingBox);
  textGeo.center();
  // var textMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
	// var textMaterial = new THREE.MeshFaceMaterial([shaderMaterial]);
  // var mesh = new THREE.Mesh(textGeo, textMaterial);
  // mesh = new THREE.Mesh(textGeo, shaderMaterial);
  // mesh.position.x = 0;
  // mesh.position.y = 0;
  // mesh.position.z = 0;
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  // mesh.geometry.dispose();
  // mesh.geometry = textGeo;
  // scene.add(mesh);

  mesh = new THREE.Mesh(new THREE.TorusBufferGeometry(size, 0.3, 30, 30), shaderMaterial);
  mesh.rotation.x = 0.3;
  scene.add(mesh);

  // pivot = new THREE.Group();
  // pivot.position.set(0.0, 0.0, -150);
  // pivot.add(mesh);
  // scene.add(pivot);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, scrollSettings.lightStrength);
  hemiLight.position.set(0, 1500, 0);
  scene.add(hemiLight);

  // var dirLightRight = new THREE.DirectionalLight(0xff1111, scrollSettings.lightStrength);
  // dirLightRight.position.set(175, 100, -75);
  // scene.add(dirLightRight);

  // var dirLightLeft = new THREE.DirectionalLight(0x00c7ff, scrollSettings.lightStrength);
  // dirLightLeft.position.set(-175, -100, 75);
  // scene.add(dirLightLeft);

  // create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);
  renderer.autoClear = false;

  var renderModel = new RenderPass(scene, camera);
  // var effectBloom = new BloomPass(1.25);
  // var effectFilm = new FilmPass(0.35, 0.95, 2048, false);

  composer = new EffectComposer(renderer);

  composer.addPass(renderModel);
  // composer.addPass(effectBloom);
  // composer.addPass(effectFilm);
  handleWindowResize();
  // dump on page

  // ticker function
  function animate() {
    var delta = 5 * clock.getDelta();
    uniforms["time"].value += 0.2 * delta;
    // gltfmodel.scene.position.y = scrollSettings.y;
    // gltfmodel.scene.rotation.y = gltfmodel.scene.rotation.y + .05;
    // pivot.rotation.y += 0.0125;

    // pivot.position.y = scrollSettings.y;
    // pivot.position.z = scrollSettings.z;
    // // scrollSettings.rotY = scrollSettings.rotY + 0.025
    // pivot.rotation.y = scrollSettings.rotY;

    // gltfmodel.scene.rotation.y = gltfmodel.scene.rotation.y + 0.01;
    // gltfmodel.scene.rotation.x = 10;
    // gltfmodel.scene.rotation.y = gltfmodel.scene.rotation.y + 1;
    // texture.offset.set(settings.x, settings.y);
    requestAnimationFrame(animate);
    // renderer.render(scene, camera);

    // camera.aspect = width / height;
    // camera.updateProjectionMatrix();

    // renderer.setSize(width, height);
    renderer.clear();
    composer.render( 0.01 );
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
  composer.setSize(width, height);
}
const init = () => {
  console.log("init");
  var loader = new THREE.FontLoader();

  loader.load("fonts/helvetiker_bold.typeface.json", function (font) {
    init3d(font);
  });

  /* 
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause",
  });
  gsap.to(scrollSettings, {
    y: -80,
    lightStrength: 3,
    scrollTrigger: {
      trigger: "#intro",
      pin: true,
      start: "top top",
      end: "+=500",
      scrub: 1,
    },
  });

  gsap.to(scrollSettings, {
    y: -160,
    scrollTrigger: {
      trigger: "#about",
      pin: true,
      start: "top top",
      end: "+=100",
      scrub: 1,
    },
  });

  gsap.to(scrollSettings, {
    y: -250,
    scrollTrigger: {
      trigger: "#cats",
      pin: true,
      start: "top top",
      end: "+=100",
      scrub: 1,
    },
  });

  gsap.to(scrollSettings, {
    rotY: 6,
    y: -200,
    z: -300,
    scrollTrigger: {
      trigger: "#outro",
      pin: true,
      start: "top top",
      end: "+=500",
      scrub: 1,
    },
  }); 
  */
};

init();
