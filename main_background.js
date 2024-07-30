import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let controls, camera, scene, renderer;
let textureEquirec;

init();

function init() {

  // CAMERAS

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 2.5);

  // SCENE

  scene = new THREE.Scene();

  // Textures
  const textureLoader = new THREE.TextureLoader();

  textureEquirec = textureLoader.load('/Cuisine_001.webp');
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.colorSpace = THREE.SRGBColorSpace;

  scene.background = textureEquirec;

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  //

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1.5;
  controls.maxDistance = 6;

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}