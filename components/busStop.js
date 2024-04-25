import * as THREE from 'three';
import createOrbitControls from '../controls/orbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createRain } from './rain.js';
import busGLTF from '../models/bus.gltf?url';
import billboardGLTF from '../models/billboard.gltf?url';
import signGLTF from '../models/sign.gltf?url';
import stopandlampGLTF from '../models/stopandlamp.gltf?url';
import floorGLTF from '../models/floor.gltf?url';

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
    floorGLTF,
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
    stopandlampGLTF,
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
    signGLTF,
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
    billboardGLTF,
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
    busGLTF,
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
