import * as THREE from 'three';
import greyTexture from '../images/grey.png';

export function createRain(scene, busStopModels, drops = 1500) {
    const minheight = 0.41, maxheight = 100;

    const geometry = new THREE.BufferGeometry();
    const textureLoad = new THREE.TextureLoader();
    const pos = [];
    const speed = [];

    for (let i = 0; i < drops; i++) {
        pos.push((Math.random() * 2 - 1) * 32);
        pos.push(Math.random() * (maxheight - minheight) + minheight);
        pos.push((Math.random() * 2 - 1)  * 19 + 9);

        speed.push(0);
        speed.push(-0.75);
        speed.push(0.1);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geometry.setAttribute('speed', new THREE.Float32BufferAttribute(speed, 3));

    const flakeMaterial = new THREE.PointsMaterial({
        size: 0.25,
        map: textureLoad.load(greyTexture),
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
        opacity: 10,
    });

    const particles = new THREE.Points(geometry, flakeMaterial);
    scene.add(particles);

    function updateParticles() {
        const position = geometry.attributes.position.array;
        const speed = geometry.attributes.speed.array;

        for (let i = 0; i < drops; i++) {
            position[i * 3 + 1] += speed[i * 3 + 1];
            const particlePosition = new THREE.Vector3(position[i * 3], position[i * 3 + 1], position[i * 3 + 2]);
            
            for (let j = 0; j < busStopModels.length; j++) {
                const boundingBox = new THREE.Box3().setFromObject(busStopModels[j]);

                if (boundingBox.containsPoint(particlePosition)) {
                    position[i * 3 + 1] = maxheight;
                }
            }

            if (position[i * 3 + 1] < minheight) {
                position[i * 3 + 1] = maxheight;
            }
        }

        geometry.attributes.position.needsUpdate = true;
    }

    function animate() {
        requestAnimationFrame(animate);
        updateParticles();
    }

    animate();
}
