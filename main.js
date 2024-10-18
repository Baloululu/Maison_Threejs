import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const Rooms = {
  exterieur1: "Outdoor0001.webp",
  exterieur2: "Outdoor0002.webp",
  exterieur3: "Outdoor0003.webp",
  cuisine: "Cuisine0025.webp",
  salon: "Salon0025.webp",
  bureau: "Bureau0001.webp",
  couloir1: "Couloir0026.webp",
  couloir2: "Couloir0025.webp",
  chambre1: "Chambre_10001.webp",
  chambre2: "Chambre_20001.webp",
  chambre3: "Chambre_30001.webp",
  sdb: "SDB0001.webp",
  cellier: "Cellier0001.webp",
  wc: "WC0001.webp"
}

let controls, camera, scene, renderer;
let textureEquirec, textureLoader;

init();

function init() {

  textureLoader = new THREE.TextureLoader();

  const param = {
    room: Rooms.cuisine,
    fullscreen: false
  };

  // CAMERAS

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 2.5);

  // SCENE

  scene = new THREE.Scene();

  // Textures
  setBackground(param.room);

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

  //

  const gui = new GUI();
  gui.add(param, "fullscreen").onChange(setFullScreen);
  gui.add(param, "room", Rooms).onChange(setBackground);
}

function setBackground(room)
{
  textureEquirec = textureLoader.load(room);
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.colorSpace = THREE.SRGBColorSpace;

  scene.background = textureEquirec;
}

function setFullScreen(value)
{
  if (value)
  {
    document.body.requestFullscreen();
  }
  else
  {
    document.exitFullscreen();
  }
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