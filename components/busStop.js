import * as THREE from 'three';
import createOrbitControls from '../controls/orbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createRain } from './rain.js';
import busGLTF from '../models/bus.glb?url';
import billboardGLTF from '../models/billboard.glb?url';
import signGLTF from '../models/sign.glb?url';
import stopandlampGLTF from '../models/stopandlamp.glb?url';
import floorGLTF from '../models/floor.glb?url';
import rainSound from '../sounds/rain.mp3'

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

function handleClick() {
    document.removeEventListener('click', handleClick);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audioLoader = new THREE.AudioLoader();
    const audio = new THREE.Audio(listener);

    audioLoader.load(rainSound, function(buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.05);
        const startTime = 0;
        const endTime = 12;

        audio.play();
        audio.source.loopStart = startTime;
        audio.source.loopEnd = endTime;
    });
}

document.addEventListener('click', handleClick);



const controls = createOrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

loader.load(
    floorGLTF,
    function (gltf) {
        floor = gltf.scene;
        scene.add(floor);
    },
    function (xhr) {
        const percentageLoaded = xhr.loaded / xhr.total * 100;
        if (percentageLoaded % 10 === 0) {
            console.log('Floor is ' + percentageLoaded + '% loaded');
        }
    },
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
    function (xhr) {
        const percentageLoaded = xhr.loaded / xhr.total * 100;
        if (percentageLoaded % 10 === 0) {
            console.log('Lamp is ' + percentageLoaded + '% loaded');
        }
    },
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
    function (xhr) {
        const percentageLoaded = xhr.loaded / xhr.total * 100;
        if (percentageLoaded % 10 === 0) {
            console.log('Sign is ' + percentageLoaded + '% loaded');
        }
    },
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
    function (xhr) {
        const percentageLoaded = xhr.loaded / xhr.total * 100;
        if (percentageLoaded % 10 === 0) {
            console.log('Billboard is ' + percentageLoaded + '% loaded');
        }
    },
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
    function (xhr) {
        const percentageLoaded = xhr.loaded / xhr.total * 100;
        if (percentageLoaded % 10 === 0) {
            console.log('Bus is ' + percentageLoaded + '% loaded');
        }
    },
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
