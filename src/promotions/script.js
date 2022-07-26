import * as THREE from 'three';
import{GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { Sky } from "three/examples/jsm/objects/Sky";

function render(){
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.25;

    camera.position.set(0, 3, 25);
    camera.lookAt(0, 0, 0);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 40, 50);
    directionalLight.lookAt(0, 0, 0);
    scene.add(directionalLight);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const loader = new GLTFLoader();
    loader.load('./tidal wreck.glb', function(gltf){
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.matrixAutoUpdate = false;
        scene.add(model);

    })

    const sky = new Sky();
    const sun = new THREE.Vector3();

    const uniforms = sky.material.uniforms;
    uniforms.turbidity.value = 1;
    uniforms.rayleigh.value = 0.0075;
    uniforms.mieCoefficient.value = 0.003;
    uniforms.mieDirectionalG.value = 0.5;
    const phi = THREE.MathUtils.degToRad(80);
    const theta = THREE.MathUtils.degToRad(180);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(sun);

    sky.scale.addScalar(100);
    scene.add(sky);

    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}

window.addEventListener('load', render);