import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

let controls, camera, scene, renderer;

init();

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');
  document.body.appendChild(renderer.domElement);

  document.body.appendChild(VRButton.createButton(renderer));

  //

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.position.set(0, 0, 2.5);

  scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(500, 120, 80);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(- 1, 1, 1);

  const textureL = new THREE.TextureLoader().load('/Salon0025_L.webp');
  textureL.colorSpace = THREE.SRGBColorSpace;
  const materialL = new THREE.MeshBasicMaterial({ map: textureL });

  const meshL = new THREE.Mesh(geometry, materialL);
  meshL.layers.set(1);

  const textureR = new THREE.TextureLoader().load('/Salon0025_R.webp');
  textureR.colorSpace = THREE.SRGBColorSpace;
  const materialR = new THREE.MeshBasicMaterial({ map: textureR });

  const meshR = new THREE.Mesh(geometry, materialR);
  meshR.layers.set(2);

  scene.add(meshL);
  scene.add(meshR);

  const textureEquirec = new THREE.TextureLoader().load('/Salon0025_L.webp');
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.colorSpace = THREE.SRGBColorSpace;

  scene.background = textureEquirec;

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