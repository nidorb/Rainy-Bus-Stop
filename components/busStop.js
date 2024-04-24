import * as THREE from 'three';
import createOrbitControls from '../controls/orbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createRain } from './rain.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

let busStopModel;
let billboard;
let sign;
let floor;
let bus;

// Declare an empty array to store loaded models
const models = [];

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(0, 1, 16);
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 0, 16);
directional.target = targetObject;
const directionalLightHelper = new THREE.DirectionalLightHelper(directional);
scene.add(directional);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-41, 25, 30);

const controls = createOrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

loader.load(
    './models/floor.gltf',
    function (gltf) {
        floor = gltf.scene;
        scene.add(floor);
    },
    undefined,
    function (error) {
        console.error('Error loading floor model:', error);
    }
);

loader.load(
    './models/stopandlamp.gltf',
    function (gltf) {
        busStopModel = gltf.scene;
        scene.add(busStopModel);
        models.push(busStopModel);
    },
    undefined,
    function (error) {
        console.error('Error loading bus stop model:', error);
    }
);

loader.load(
    './models/sign.gltf',
    function (gltf) {
        sign = gltf.scene;
        scene.add(sign);
    },
    undefined,
    function (error) {
        console.error('Error loading sign model:', error);
    }
);

loader.load(
    './models/billboard.gltf',
    function (gltf) {
        billboard = gltf.scene;
        billboard.position.y += 0.41;
        scene.add(billboard);
    },
    undefined,
    function (error) {
        console.error('Error loading billboard model:', error);
    }
);

loader.load(
    './models/bus.gltf',
    function (gltf) {
        bus = gltf.scene;
        scene.add(bus);
    },
    undefined,
    function (error) {
        console.error('Error loading bus model:', error);
    }
);

createRain(scene, models);

// const hdriloader = new RGBELoader().load('./images/hdri.hdr');
// let skySphereGeom = new THREE.SphereGeometry(100, 100, 100);
// let skySphereMat = new THREE.MeshPhongMaterial({
//     map: hdriloader,
// });

// skySphereMat.side = THREE.BackSide;
// let skySphereMesh = new THREE.Mesh(skySphereGeom, skySphereMat);
// scene.add(skySphereMesh);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

onWindowResize();
animate();
