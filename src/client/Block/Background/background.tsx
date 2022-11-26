import React from "react";
import * as THREE from "three";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Sky } from "three/examples/jsm/objects/Sky";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import compareVersions from "compare-versions";

import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import getMime from "Utils/getMime/getMime";
import databaseInfo from "Config/databaseinfo.json";
import versions from "Config/versions.json";
import backgroundNameState from "State/background/backgroundState";
import gameConfigState from "State/gameConfig/gameConfig";



import style from "./background.scss"

const Background: React.FC<{ onload?: Function }> = (props) => {
    const backgroundCanvas = React.useRef<HTMLDivElement>(null);
    const backgroundImage = React.useRef<HTMLImageElement>(null);
    const backgroundRenderer = React.useRef<THREE.WebGLRenderer | null>();
    const backgroundScene = React.useRef<THREE.Scene | null>();
    const backgroundState = useRecoilValue(backgroundNameState);
    const backgroundCamera = React.useRef<THREE.PerspectiveCamera | null>();
    const gameConfig = useRecoilValue(gameConfigState);

    const backgroundData = React.useMemo(async () => {
        let background: backgroundAssetContents = {
            name: "",
            data: new ArrayBuffer(0),
            alt: {
                data: new ArrayBuffer(0),
                mime: "image/png"
            },
            skydata: {
                turbidity: 0,
                rayleigh: 0,
                mieCoeffient: 0,
                mieDirectionalG: 0,
                sunPhi: 0,
                sunTheta: 0
            },
            made: "official",
            scenes: [],
            installedAt: 0
        }
        if (!backgroundState.showed) return background;

        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = (event) => {
                const db = dbOpenRequest.result;
                const backgroundStore = db.transaction(databaseInfo.backgroundStore, "readonly").objectStore(databaseInfo.backgroundStore);
                const model = backgroundStore.get((backgroundState.name == "default" ? versions.themeBackground : backgroundState.name));
                model.onsuccess = (event) => {
                    background = model.result as backgroundAssetContents;
                    resolve();
                }
                model.onerror = (event) => {
                    console.log(event);

                    resolve();
                }
            }
        })

        return background;
    }, [backgroundState]).then(background => background);


    function disposeRenderer() {
        if (backgroundRenderer.current) {
            backgroundRenderer.current.dispose();
            backgroundRenderer.current = null
        }
    }

    async function renderBackground() {

        const background = await backgroundData

        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({
            precision: "lowp",
            antialias: (gameConfig.graphics.background.postProcessing.enabled && gameConfig.graphics.background.postProcessing.antialias == "default")
        });

        backgroundRenderer.current = renderer;
        backgroundScene.current = scene;

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.physicallyCorrectLights = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.25;
        backgroundRenderer.current = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(gameConfig.graphics.background.resolution || 0.7);

        if (backgroundCanvas.current) backgroundCanvas.current.appendChild(renderer.domElement);


        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 3, 25);
        camera.lookAt(0, 0, 0);
        backgroundCamera.current = camera;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(0, 40, 50);
        directionalLight.lookAt(0, 0, 0);
        scene.add(directionalLight);

        console.log(background.data);


        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(
            background.data
        );
        const model = gltf.scene;
        model.matrixAutoUpdate = false;
        model.position.set(0, 0, 0);
        scene.add(model);

        const sky = new Sky();
        const sun = new THREE.Vector3();

        const uniforms = sky.material.uniforms;
        uniforms.turbidity.value = background.skydata.turbidity;
        uniforms.rayleigh.value = background.skydata.rayleigh;
        uniforms.mieCoefficient.value = background.skydata.mieCoeffient;
        uniforms.mieDirectionalG.value = background.skydata.mieDirectionalG;
        const phi = background.skydata.sunPhi;
        const theta = background.skydata.sunTheta;

        sun.setFromSphericalCoords(1, phi, theta);

        uniforms['sunPosition'].value.copy(sun);

        sky.scale.addScalar(100);
        scene.add(sky);

        //post processing
        const composer = new EffectComposer(renderer);
        const renderScene = new RenderPass(scene, camera);
        composer.addPass(renderScene);
        /* const ssaoPass = new SSAOPass(scene, camera);
        ssaoPass.kernelRadius = 16;
        composer.addPass(ssaoPass); */

        /*const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth * gameConfig.graphics.background.resolution || 0.7,
                window.innerHeight * gameConfig.graphics.background.resolution || 0.7
                ), 1.5, 0.4, 0);
        composer.addPass(bloomPass); */
        function render() {
            setInterval(() => {
                //renderer.render(scene, camera);
                composer.render();
            }, 1000 / (gameConfig.graphics.background.fps || 30))
        }
        render();


        function resizeRenderer() {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function mousemove(e: any) {
            const mouse = [e.clientX, e.clientY];
            const diff = [-(mouse[0] - window.innerWidth / 2), -(mouse[1] - window.innerHeight / 2)];
            camera.rotation.set(diff[1] * 0.0001, diff[0] * 0.0001, 0);
        }

        //window events
        window.removeEventListener("resize", resizeRenderer);
        window.addEventListener("resize", resizeRenderer);
        window.removeEventListener("mousemove", mousemove);
        window.addEventListener("mousemove", mousemove);
    }

    React.useEffect(() => {
        if (!backgroundState.showed) return;
        if (backgroundState.renderer == "2D" && backgroundRenderer.current) disposeRenderer();
        if (backgroundImage.current) {
            (async () => {
                const background = (await backgroundData).alt

                if (backgroundImage.current)
                    backgroundImage.current.src = background ? `data:${background.mime};base64,` + arrayBufferToBase64(background.data) : "data:image/png;base64," + new ArrayBuffer(0)
            })();
        }
        if (backgroundState.renderer == "3D" && backgroundCanvas.current && !backgroundRenderer.current) {
            renderBackground();
        }
    }, [backgroundState]);


    return (
        <div className={style.backgroundvanvas}>
            <img src={""} alt="" ref={backgroundImage} className={style.backgroundimg} />
            <div ref={backgroundCanvas} className={style.renderer} />
        </div>
    )
}

export default Background;
