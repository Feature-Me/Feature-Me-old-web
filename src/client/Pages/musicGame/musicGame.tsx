import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import musicGameState from "State/musicGame/musicGameState";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import parseChart from "Utils/parseChart/parseChart";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {motion, useAnimation} from "framer-motion";
import { Howl, Howler } from "howler";

import style from "./musicGame.scss";

import Head from "Block/head/head";

import loadBehavior from "Utils/resourcesLoader/loadBehavior";
import loadSoundEffect from "Utils/resourcesLoader/loadSoundEffect";
import arrayBufferToBase64 from "Utils/arrayBufferToBase64/ArrayBuffertoBase64";

import version from "Config/versions.json";
import sleep from "Utils/sleep/sleep";



const MusicGame: React.FC = () => {
    const selectedMusic = useRecoilValue(musicSelectorState);
    const [musicGame, setMusicGame] = useRecoilState(musicGameState);
    const gameConfig = useRecoilValue(gameConfigState);

    const musicgameCanvasRef = React.useRef<HTMLDivElement>(null);
    const musicgameRenderer = React.useRef<THREE.WebGLRenderer | null>();
    const musicgameScene = React.useRef<THREE.Scene | null>();

    const musicGameUIRef = React.useRef<HTMLDivElement>(null);
    const musicGameTitleRef = React.useRef<HTMLDivElement>(null);

    const musicData = selectedMusic.selectedData as MusicAssetContents;
    const chartMetaData = musicData.metadata.difficulties.find(diff => diff.name == musicGame.difficulty);
    const rawChart = musicData.chart.find((c) => c.name === musicGame.difficulty);
    const rawMusic = musicData.music.find((m) => m.name === musicData.metadata.selectedMusic);
    //if rawChart or rawMusic is undefined, play error music
    const chart = parseChart(rawChart!.data);

    const [readyState, setReadyState] = React.useState(false);

    let musicUri = `data:${rawMusic?.mime||"audio/mp3"};base64,${arrayBufferToBase64(rawMusic?.data || new ArrayBuffer(0))}`;

    let musicAudio = new Howl({
        src: [musicUri],
        volume: (gameConfig.audio.masterVolume * gameConfig.audio.musicVolume)
    });


    const titleAnimationController = useAnimation();
    const titleAnimation = {
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    }

    const behavior = React.useMemo(async () => {

        const behaviorName = {
            model: gameConfig.gameplay.behavior.model == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.model,
            sound: gameConfig.gameplay.behavior.sound == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.sound,
            font: gameConfig.gameplay.behavior.font == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.font,
        }

        console.log(behaviorName);
        

        const behaviordata = await loadBehavior(behaviorName.model);

        if (behaviorName.sound == "default" || behaviorName.sound == "auto") {
            behaviorName.sound = behaviordata.soundEffect || version.defaultBehavior;
        }
        if (behaviorName.font == "default" || behaviorName.font == "auto") {
            behaviorName.font = behaviordata.font || version.defaultFont;
        }

        const soundEffectdata = await loadSoundEffect(behaviorName.sound);
        const fontdata = await loadBehavior(behaviorName.font);

        return {
            model: behaviordata,
            sound: soundEffectdata,
            font: fontdata,
        }

    },[]);

    behavior.then(() => {
        setReadyState(true);
    });

    /* loadBehavior(gameConfig.gameplay.behavior.model).then((result) => {
        behavior = result;
        console.log(result);
        
        if (behaviorName.sound == "default" || behaviorName.sound == "auto") {
            behaviorName.sound = result.soundEffect
        }
    })
    .then(async () => {
        soundEffect = await loadSoundEffect(behaviorName.sound)
        console.log(soundEffect);
        
        setReadyState(true);
    }) */

    console.log(musicGame,chart);
    

    function initializeScene() {
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            precision: "highp",
            antialias: (gameConfig.graphics.background.postProcessing.enabled && gameConfig.graphics.musicgame.postProcessing.antialias == "default")
        });

        const scene = new THREE.Scene();
        musicgameScene.current = scene;

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.physicallyCorrectLights = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.25;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(gameConfig.graphics.musicgame.resolution || 1);
        if (musicgameCanvasRef.current) musicgameCanvasRef.current.appendChild(renderer.domElement);

        musicgameRenderer.current = renderer;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 150);
        camera.position.set(0, 8, 5);
        camera.rotation.set(THREE.MathUtils.degToRad(-38), 0, 0);


        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(0, 10, 10);
        directionalLight.lookAt(0, 0, -10);
        scene.add(directionalLight);


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
                composer.render();
            }, 1000 / (gameConfig.graphics.musicgame.fps || 120));
        }
        render();

        function resizeRenderer() {
            camera.aspect = window.innerWidth / window.innerHeight;
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.removeEventListener("resize", resizeRenderer);
        window.addEventListener("resize", resizeRenderer);

    }

    async function setGround() {
        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(
            (await behavior).model.models.ground
        )
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        if(musicgameScene.current) musicgameScene.current.add(model);
    }

    React.useEffect(() => {
        initializeScene();

        chart.then((c) => {
            setMusicGame(game => { return { ...game, bpm: c.metadata.initialBpm } });
        })

    }, []);

    React.useEffect(() => {
        let Timeout: NodeJS.Timeout;
        let audio: Howl;
        if (readyState) {
            console.log("ready");
            console.log(behavior);
            setGround();

            Timeout = setTimeout(async () => {
                
                if(musicGameTitleRef.current){
                    titleAnimationController.start(titleAnimation);
                    await sleep(500);
                    musicGameTitleRef.current.style.visibility = "hidden";

                    const sound = (await behavior).sound.sound.assist;
                    const soundUri = `data:${sound.mime};base64,${arrayBufferToBase64(sound.data)}`;
                    audio = new Howl({
                        src: [soundUri],
                        volume: (gameConfig.audio.masterVolume * gameConfig.audio.effectVolume) ||1,
                    });
                    for(let i = 0; i < 4; i++){
                        audio.play();
                        await sleep((60/musicGame.bpm)*1000);
                    }
                    musicAudio.play();
                }
            }, 2500);
        }

        return () => {
            clearTimeout(Timeout);
            musicAudio.unload();
            if(audio) audio.unload();
        }
    }, [readyState]);

    return (
        <div>
            <div className={style.musicgameCanvas} ref={musicgameCanvasRef}></div>
            <div className={style.musicgameUI} ref={musicGameUIRef}></div>
            <motion.div className={style.musicgameTitle} ref={musicGameTitleRef} animate={titleAnimationController}>
                <p>{`${chartMetaData?.name} ${chartMetaData?.level}`} - {chartMetaData?.chartDesigner}</p>
                <div className={style.thumbnail} style={{ backgroundImage: `url(data:${musicData.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(musicData.metadata.thumbnail.data)})` }}></div>
                <h1>{musicData.metadata.title}</h1>
                <h2>{musicData.metadata.composer}</h2>
            </motion.div>
        </div>
    )
}

export default MusicGame;