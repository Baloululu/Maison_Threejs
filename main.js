import "./style.css"

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const Rooms = {
  exterieur1: "Outdoor0001",
  exterieur2: "Outdoor0002",
  exterieur3: "Outdoor0003",
  cuisine: "Cuisine0025",
  salon: "Salon0025",
  bureau: "Bureau0001",
  couloir1: "Couloir0026",
  couloir2: "Couloir0025",
  chambre1: "Chambre_10001",
  chambre2: "Chambre_20001",
  chambre3: "Chambre_30001",
  sdb: "SDB0001",
  cellier: "Cellier0001",
  wc: "WC0001"
}

let controls, camera, scene, renderer;
let textureEquirec, textureLoader;

let param = {
  room: Rooms.cuisine,
  fullscreen: false,
  HD: false
};

init();

function init() {

  textureLoader = new THREE.TextureLoader();

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
  gui.add(param, "HD").onChange(setBackground);
  gui.add(param, "room", Rooms).onChange(setBackground);
}

function setBackground(_room)
{
  textureEquirec = textureLoader.load(param.room + (param.HD ? "" : "_mobile") + ".webp");
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