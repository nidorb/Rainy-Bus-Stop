import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function createOrbitControls(camera, rendererDomElement) {
    const controls = new OrbitControls(camera, rendererDomElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 1, 0);

    return controls;
}

