import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Sky} from "three/examples/jsm/objects/Sky";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer"
import {SAOPass} from "three/examples/jsm/postprocessing/SAOPass"
import {SSAOPass} from "three/examples/jsm/postprocessing/SSAOPass"
import {SMAAPass} from "three/examples/jsm/postprocessing/SMAAPass"
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { match } from "ts-pattern";



import style from "./background.scss"
import gameData from "dataController/gameData/gameData";
import { toast } from "react-toastify";

const Background: React.FC<{onload?:Function}> = (props) => {

    const backgroundCanvas = React.useRef<HTMLDivElement>();
    React.useEffect(() => {
        try {
            console.log("Background canvas mounted");

            console.log(JSON.parse(localStorage.getItem("gameConfig")!).background.use3DBackground?"using 3D background":"using 2D background");


            if (JSON.parse(localStorage.getItem("gameConfig")!).background.use3DBackground) {
                initBackground(backgroundCanvas).then(() => {
                    if (props.onload) {
                        props.onload();
                    }
                })
            } else if (props.onload) {
                props.onload();
            }
        } catch (error) {
            console.log(error);

        }
    }, []);
    return (
        <div className={style.backgroundvanvas}>
            {gameData.background.alt ? <img src={gameData.background.alt} className={style.backgroundimg} /> : <></>}
            <div ref={backgroundCanvas} className={style.renderer} ></div>
        </div>)
}

function initBackground(backgroundCanvas: React.RefObject<HTMLDivElement>):Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const gameConfig = JSON.parse(localStorage.getItem("gameConfig")!).background;
        try {
            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({
                precision:"lowp",
                antialias: (gameConfig.postProcessing.enabled&&gameConfig.postProcessing.antialias == "default")
            });
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.physicallyCorrectLights = true;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.25;
            gameData.background.renderer.engine = renderer;
            renderer.setSize(window.innerWidth, window.innerHeight);
            backgroundCanvas.current.appendChild(renderer.domElement);
            renderer.setPixelRatio(gameConfig.resolution || 0.8);
            render();
            function render() {
                setInterval(()=>{
                    renderer.render(scene, camera);
                },1000/gameConfig.fps||45)
            }

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set(10, 3, 25);
            camera.lookAt(10, 0, 0);
            

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
            directionalLight.position.set(0, 40, 50);
            directionalLight.lookAt(0, 0, 0);
            scene.add(directionalLight);

            const gltf = await new GLTFLoader().loadFromArrayBufferAsync(gameData.background.data)
            const model = gltf.scene;
            model.matrixAutoUpdate = false;
            model.position.set(0, 0, 0);
            scene.add(model);

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


            //post process
            //if(localStorage.getItem(""))

            //window events
            window.addEventListener("resize", () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            window.addEventListener("mousemove", e => {
                const mouse = [e.clientX, e.clientY];
                const diff = [-(mouse[0] - window.innerWidth / 2), -(mouse[1] - window.innerHeight / 2)];
                camera.rotation.set(diff[1] * 0.0001, diff[0] * 0.0001, 0);
            })
            resolve();
        } catch (error) {
            reject();
            console.error(error);
            toast.error("Failed to load background:"+error);
        }
    });

}

function disposeRenderer() {
    if (gameData.background.renderer.engine) {
        gameData.background.renderer.engine.dispose();
        gameData.background.renderer.engine = null;
    }
}

export default Background;

