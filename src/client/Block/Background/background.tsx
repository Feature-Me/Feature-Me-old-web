import React from "react";
import * as THREE from "three";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Sky } from "three/examples/jsm/objects/Sky";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { match } from "ts-pattern";

import style from "./background.scss"

import databaseInfo from "../../Config/databaseinfo.json";
import versions from  "../../Config/versions.json";
import backgroundNameState from "State/background/backgroundState";
import gameConfigState from "State/gameConfig/gameConfig";
import compareVersions from "compare-versions";
import { modelAssetContents } from "Utils/resources/backgroundResources/installBackground";
import arrayBufferToBase64 from "Utils/ArrayBuffertoBase64/ArrayBuffertoBase64";
import getMime from "Utils/getMime/getMime";

const Background: React.FC<{ onload?: Function }> = (props) => {
    const backgroundCanvas = React.useRef<HTMLDivElement>(null);
    const backgroundImage = React.useRef<HTMLImageElement>(null);
    const backgroundRenderer = React.useRef<THREE.WebGLRenderer|null>();
    const backgroundScene = React.useRef<THREE.Scene|null>();
    const backgroundState = useRecoilValue(backgroundNameState);
    const backgroundCamera = React.useRef<THREE.PerspectiveCamera|null>();
    const gameConfig = useRecoilValue(gameConfigState);

    const backgroundData = React.useMemo(async () => {
        let background: modelAssetContents = {
            data: new ArrayBuffer(0),
            alt: {
                data: new ArrayBuffer(0),
                mime: "image/png"
            }
        }
        if (!backgroundState.showed) return background;

        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = (event) => {
                const db = dbOpenRequest.result;
                const backgroundStore = db.transaction(databaseInfo.backgroundStore, "readonly").objectStore(databaseInfo.backgroundStore);
                const model = backgroundStore.get((backgroundState.name == "default" ? versions.themeBackground : backgroundState.name));
                model.onsuccess = (event) => {
                    background = model.result.data;
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
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({
            precision: "lowp",
            antialias: (gameConfig.graphics.background.postProcessing.enabled && gameConfig.gameConfig.graphics.background.postProcessing.antialias == "default")
        });

        backgroundRenderer.current = renderer;
        backgroundScene.current = scene;

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.physicallyCorrectLights = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.25;
        backgroundRenderer.current = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        if(backgroundCanvas.current) backgroundCanvas.current.appendChild(renderer.domElement);
        renderer.setPixelRatio(gameConfig.resolution || 0.7);
        console.log("render",backgroundScene);
        
        render();
        function render() {
            setInterval(() => {
                renderer.render(scene, camera);
            }, 1000 / (gameConfig.fps || 30))
        }

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 3, 25);
        camera.lookAt(10, 0, 0);
        backgroundCamera.current = camera;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(0, 40, 50);
        directionalLight.lookAt(0, 0, 0);
        scene.add(directionalLight);

        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(
            await backgroundData.then(background => background.data as ArrayBuffer)
        );
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


        function resizeRenderer(){
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function mousemove(e:any){
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
        if(!backgroundState.showed) return;
        if(backgroundState.renderer=="2D" && backgroundRenderer.current) disposeRenderer();
        if(backgroundImage.current){
            (async ()=> {
                if(backgroundImage.current)
                    backgroundImage.current.src = await backgroundData.then(background => (getMime(background.alt?.mime || "") || "data:image/png;base64,") +arrayBufferToBase64(background.alt?.data || new ArrayBuffer(0)));
            })();
        }
        if(backgroundState.renderer=="3D" && backgroundCanvas.current && !backgroundRenderer.current) {
            renderBackground();
        }
    },[backgroundState]);


    return (
        <div className={style.backgroundvanvas}>
            <img src={""} alt="" ref={backgroundImage}  className={style.backgroundimg}/>
            <div ref={backgroundCanvas} className={style.renderer} />
        </div>
        )
}

export default Background;
