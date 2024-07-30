import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let controls, camera, scene, renderer;

init();

function init() {

  // CAMERAS

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.position.set(0, 0, 2.5);

  // SCENE

  scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(- 1, 1, 1);

  const texture = new THREE.TextureLoader().load('/Cuisine_001.webp');
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

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