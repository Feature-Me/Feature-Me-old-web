import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion, useAnimation } from "framer-motion";
import { Howl, Howler } from "howler";

import style from "./musicGame.scss";

import Head from "Block/head/head";
import MusicGameUI from "./UI/musicGameUI";

import loadBehavior from "Utils/resourcesLoader/loadBehavior";
import loadSoundEffect from "Utils/resourcesLoader/loadSoundEffect";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import parseChart from "Features/parseChart/parseChart";
import sleep from "Utils/sleep/sleep";
import renderingStatus from "Utils/getRenderingStatus/renderingStatus";

import gameConfigState from "State/gameConfig/gameConfig";
import musicSelectorState from "State/musicSelector/musicSelectorState";

import * as musicGame from "State/musicGame/musicGameState"

import version from "Config/versions.json";
import { chartType } from "Features/parseChart/chartSample";
import acceptBehavior from "Features/acceptBehavior/acceptBehavior";
import { holdNote, note, seedNote } from "Features/chartClass/notes";
import { musicGameVariablesType } from "Types/game/gameVariables";


const MusicGame: React.FC = () => {
    console.log("run");
    
    const selectedMusic = useRecoilValue(musicSelectorState);
    const gameConfig = useRecoilValue(gameConfigState);
    const [ready, setReady] = React.useState(false);

    const setMusicGameValue = useSetRecoilState(musicGame.musicGameValueState);
    const setMusicGameNotesJudge = useSetRecoilState(musicGame.musicGameNotesJudgeState)
    const setMusicGamePrediction = useSetRecoilState(musicGame.musicGamePredictionState);
    const setMusicGameUIState = useSetRecoilState(musicGame.musicGameUIState);
    const [musicGameMode, setMusicGameMode] = useRecoilState(musicGame.musicGameModeState);
    const setMusicGamePause = useSetRecoilState(musicGame.musicGamePauseState);
    const setMusicGameTime = useSetRecoilState(musicGame.musicGameTimeState)

    const musicgameCanvasRef = React.useRef<HTMLDivElement>(null);

    const musicData = selectedMusic.selectedData as MusicAssetContents;
    const chartMetaData = musicData.metadata.difficulties.find(diff => diff.name == musicGameMode.difficulty);
    const rawChart = musicData.chart.find((c) => c.name === musicGameMode.difficulty);
    const rawMusic = musicData.music.find((m) => m.name === musicData.metadata.selectedMusic);
    //if rawChart or rawMusic is undefined, play error music
    let chart: chartType;
    //let behavior: { model: behaviorAssetContents; sound: soundEffectAssetContents; font: behaviorAssetContents; };
    //const activeRange = musicGame_.mode == "auto"? 0: 1000;
    //const activeRange = 0;
    const gameOptions = {
        alpha:true,
    }
    const gameRenderer = new THREE.WebGLRenderer(gameOptions);
    const gameScene = new THREE.Scene();
    const notesContainer = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 87.5)
    const composer = new EffectComposer(gameRenderer);

    let musicGameVariables:musicGameVariablesType = {
        startTime: 0,
        initialVoidTime: 0,
        activeNotes:[],
        delay:0,
        ready:false,
        inputs:{
            position:"left",
            lanes:[false,false,false,false]
        }
    }

    let musicUri = `data:${rawMusic?.mime || "audio/mp3"};base64,${arrayBufferToBase64(rawMusic?.data || new ArrayBuffer(0))}`;
    let musicDuration: number = 0;
    let musicAudio = new Howl({
        src: [musicUri],
        volume: (gameConfig.audio.masterVolume * gameConfig.audio.musicVolume) || 1,
    });



    const getBehavior = React.useMemo(async () => {

        const behaviorName = {
            model: gameConfig.gameplay.behavior.model == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.model,
            sound: gameConfig.gameplay.behavior.sound == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.sound,
            font: gameConfig.gameplay.behavior.font == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.font,
        }

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

    }, []);

    React.useEffect(() => {
        preparingGame();

        return () => {
            musicAudio.stop();
            musicAudio.unload();
        }
    }, []);

    function preparingGame() {
        //console.log(musicData,rawChart);
        getBehavior.then((behavior)=>{
            parseChart(rawChart!.data, gameConfig.gameplay.scrollSpeed).then(async (chartData) => {

                await initRenderer();

                const volume = (gameConfig.audio.masterVolume * gameConfig.audio.effectVolume) || 1;
                chart = await acceptBehavior(chartData, behavior.model, behavior.sound, volume);
                setMusicGameValue(value => {
                    return {
                        ...value,
                        bpm: chartData.metadata.initialBpm,
                        
                    }
                })
                setMusicGamePause(pause=>{
                    return{
                        ...pause,
                        ready:true,
                        paused:false
                    }
                })
                setMusicGameNotesJudge(judge=>{
                    return {
                        ...judge,
                        notesCount:{
                            current:0,
                            all:chart.metadata.chain,
                        }
                    }
                })
                const totalTime = musicData.metadata.time.ms + (((60 / chartData.metadata.initialBpm) * 1000) * 4) + 1000;
                 setMusicGameTime(time => {
                    return {
                        ...time,
                        totalTime: totalTime,
                    }
                })

                musicGameVariables.initialVoidTime = (((60 / chartData.metadata.initialBpm) * 1000) * 4)
                musicGameVariables.startTime = performance.now() + (((60 / chartData.metadata.initialBpm) * 1000) * 4) + 3500 + chartData.metadata.offset;
                musicGameVariables.ready = true;
                await sleep(3500);
                const sound = (await getBehavior).sound.sound.assist;
                const soundUri = `data:${sound.mime};base64,${arrayBufferToBase64(sound.data)}`;
                const audio = new Howl({
                    src: [soundUri],
                    volume: gameConfig.audio.effectVolume || 1,
                });
                for (let i = 0; i < 4; i++) {
                    audio.play();
                    await sleep((60 / chartData.metadata.initialBpm) * 1000);
                }
                audio.stop();
                musicAudio.play();
                musicGameVariables.delay = performance.now() - musicGameVariables.startTime
            })
        })
    }

    async function initRenderer(){
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 7);

        gameRenderer.outputEncoding = THREE.sRGBEncoding;
        gameRenderer.physicallyCorrectLights = true;
        gameRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        gameRenderer.toneMappingExposure = 0.25;
        gameRenderer.setSize(window.innerWidth,window.innerHeight);
        gameRenderer.setPixelRatio(gameConfig.graphics.musicgame.resolution || 1);
        musicgameCanvasRef.current?.appendChild(gameRenderer.domElement);
        gameScene.name = "musicGameScene";
        notesContainer.name = "notesContainer";

        directionalLight.position.set(0, 10, 10);
        directionalLight.lookAt(0, 0, -10);

        camera.position.set(0, 8, 5);
        camera.rotation.set(THREE.MathUtils.degToRad(-38), 0, 0);

        gameScene.add(ambientLight,directionalLight,notesContainer);

        const renderPass = new RenderPass(gameScene, camera);
        composer.addPass(renderPass);

        await setGround();
        await setCharacter();
        setInterval(render, (gameConfig.graphics.musicgame.fps || 120) / 1000)
    }

    async function setGround() {
        const groundGltf = (await getBehavior).model.models.ground;
        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(groundGltf)
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.receiveShadow = true;
        gameScene.add(model)
    }
    async function setCharacter() {
        const groundGltf = (await getBehavior).model.models.character;
        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(groundGltf);
        const model = gltf.scene;
        model.position.set(-9, 0, 0);
        model.rotation.set(0, 0, 0)
        model.castShadow = true;
        gameScene.add(model)
    }
    
    function render() {
        composer.render();
        updateGame();
    }
    function updateGame(){
        if(!musicGameVariables.ready)return;
        const elapsedTime = performance.now() - musicGameVariables.startTime;
        const gameTime = elapsedTime - /* musicGameVariables.delay - */ gameConfig.gameplay.timing.offset;
        const judgeTime = gameTime - gameConfig.gameplay.timing.judge;
        console.log(gameTime,musicGameVariables.delay);
        for (const note of musicGameVariables.activeNotes) {
            if(note.judged){
                note.active = false;
                notesContainer.remove(note.note);
                const index = musicGameVariables.activeNotes.findIndex(n=>n==note);
                musicGameVariables.activeNotes.splice(index,1);
            }
            note.updatePosition(gameTime)
            
        }
        for (const note of chart.notes) {
            console.log(note, note.scrollTime, note.time, gameTime, note.time - Math.abs(gameTime))
            if(note.active)continue;
            if(note.time - Math.abs(gameTime) < note.scrollTime){
                note.active = true;
                notesContainer.add(note.note);
                musicGameVariables.activeNotes.push(note);
            }
            
        }
    }

/*     React.useEffect(() => {
        if (!musicGameMode.ready) return;
        if (musicGameMode.paused) {

        } else {

        }

    }, [musicGameMode.paused, musicGameMode.ready])
 */
    return (
        <div>
            <div className={style.musicgameCanvas} ref={musicgameCanvasRef}></div>
            {/* <MusicGameRenderer render={false} /> */}
            <MusicGameUI />
        </div>
    )
}

export default MusicGame;