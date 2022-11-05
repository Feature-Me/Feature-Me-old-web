import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion, useAnimation } from "framer-motion";
import { Howl, Howler } from "howler";

import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass";

import style from "./musicGame3d.scss";

import MusicGameUI from "../UI/musicGameUI";

import loadBehavior from "Utils/Storage/resourcesLoader/loadBehavior";
import loadSoundEffect from "Utils/Storage/resourcesLoader/loadSoundEffect";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import parseChart from "Features/play/parseChart/parseChart";
import sleep from "Utils/sleep/sleep";

import renderingStatus from "Utils/getRenderingStatus/renderingStatus";

import gameConfigState from "State/gameConfig/gameConfig";
import musicSelectorState from "State/play/musicSelector/musicSelectorState";

import * as musicGame from "State/play/game/musicGame/musicGameState"

import version from "Config/versions.json";
import { chartType } from "Features/play/parseChart/chartSample";
import acceptBehavior from "Features/play/acceptBehavior/acceptBehavior";
import { brightNote, holdNote, note, seedNote, tapNote } from "Features/play/chartClass/notes";
import { musicGameVariablesType } from "Types/play/game/gameVariables";
import { match } from "ts-pattern";
import easings from "Utils/easing/easing";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import { cloneDeep } from "lodash";
import loadFont from "Utils/Storage/resourcesLoader/loadFont";


const MusicGame3D: React.FC = () => {
    const scenechange = useSeneChangeNavigation();
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
        alpha: true,
    }
    const gameRenderer = new THREE.WebGLRenderer(gameOptions);
    const gameScene = new THREE.Scene();
    const notesContainer = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 87.5)
    const composer = new EffectComposer(gameRenderer);
    let character: THREE.Object3D = new THREE.Object3D();
    let gameRenderInterval: NodeJS.Timer;

    let musicGameVariables: musicGameVariablesType = {
        activeRange: 250,
        activeNotes: [],
        delay: 0,
        ready: false,
        inputs: {
            position: "left",
            lanes: [false, false, false, false]
        },
        time: {
            initialVoidTime: 0,
            startTime: 0,
            elapsedTime: 0,
            gameTime: 0,
            judgeTime: 0,
            totalTime: 0
        }
    }

    let musicUri = `data:${rawMusic?.mime || "audio/mp3"};base64,${arrayBufferToBase64(rawMusic?.data || new ArrayBuffer(0))}`;
    let musicDuration: number = 0;
    let musicAudio = new Howl({
        src: [musicUri],
        volume: (gameConfig.audio.masterVolume * gameConfig.audio.musicVolume) || 1,
    });

    let ResultNavigationInterval: NodeJS.Timeout;

    const getBehavior = React.useMemo(async () => {

        const behaviorName = {
            model: gameConfig.gameplay.behavior.model == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.model,
            sound: gameConfig.gameplay.behavior.sound == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.sound,
            font: gameConfig.gameplay.behavior.font == "default" ? version.defaultFont : gameConfig.gameplay.behavior.font,
        }

        const behaviordata = await loadBehavior(behaviorName.model);

        if (behaviorName.sound == "default" || behaviorName.sound == "auto") {
            behaviorName.sound = behaviordata.soundEffect || version.defaultBehavior;
        }
        if (behaviorName.font == "default" || behaviorName.font == "auto") {
            behaviorName.font = behaviordata.fontName || version.defaultFont;
        }

        const soundEffectdata = await loadSoundEffect(behaviorName.sound);
        const fontdata = await loadFont(behaviorName.font);

        return {
            model: behaviordata,
            sound: soundEffectdata,
            font: fontdata,
        }

    }, []);

    React.useEffect(() => {
        preparingGame();
        window.addEventListener("keydown", keyInput);
        window.addEventListener("resize", resizeCanvas);
        return () => {
            clearTimeout(ResultNavigationInterval);
            clearInterval(gameRenderInterval);
            gameRenderer.dispose();
            window.removeEventListener("keydown", keyInput);
            window.removeEventListener("resize", resizeCanvas);
            musicAudio.stop();
            musicAudio.unload();
        }
    }, []);

    function keyInput(key: KeyboardEvent) {
        if (!gameConfig.gameplay.key.includes(key.code)) return;

        const keyPos = gameConfig.gameplay.key.findIndex(str => str == key.code) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
        keyAction(keyPos);
    }
    function keyAction(keyPos: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
        return match(keyPos)
            .with(0, () => { judgeKeyPush(0) })
            .with(1, () => { judgeKeyPush(1) })
            .with(2, () => { judgeKeyPush(2) })
            .with(3, () => { judgeKeyPush(3) })
            .with(4, () => { judgeKeyPush(4) })
            .with(5, () => { musicGameVariables.inputs.position = "left"; moveCharacter("left") })
            .with(6, () => { musicGameVariables.inputs.position = "right"; moveCharacter("right") })
            .exhaustive();
    }

    //when resized window, resize canvas to fit window size
    function resizeCanvas() {
        gameRenderer.setSize(window.innerWidth, window.innerHeight)
    }

    //accept behavior , load chart and play assist sound
    function preparingGame() {
        getBehavior.then((behavior) => {
            parseChart(rawChart!.data, gameConfig.gameplay.scrollSpeed).then(async (chartData) => {

                await initRenderer();

                const volume = (gameConfig.audio.masterVolume * gameConfig.audio.effectVolume) || 1;
                chart = await acceptBehavior(chartData, behavior.model, behavior.font, behavior.sound, volume);
                setMusicGameValue(value => {
                    return {
                        ...value,
                        bpm: chartData.metadata.initialBpm,

                    }
                })
                setMusicGamePause(pause => {
                    return {
                        ...pause,
                        ready: true,
                        paused: false
                    }
                })
                setMusicGameNotesJudge(judge => {
                    return {
                        ...judge,
                        notesCount: {
                            current: 0,
                            all: chart.metadata.chain,
                        }
                    }
                })
                const totalTime = musicData.metadata.time + (((60 / chartData.metadata.initialBpm) * 1000) * 4) + 1000;
                musicGameVariables.time.totalTime = totalTime;
                setMusicGameTime(time => {
                    return {
                        ...time,
                        totalTime: totalTime,
                        startedTime: performance.now()
                    }
                })

                musicGameVariables.time.initialVoidTime = (((60 / chartData.metadata.initialBpm) * 1000) * 4)
                musicGameVariables.time.startTime = performance.now() + (((60 / chartData.metadata.initialBpm) * 1000) * 4) + 3500 + chartData.metadata.offset;
                musicGameVariables.ready = true;
                ResultNavigationInterval = setInterval(() => {
                    scenechange("../result");
                }, totalTime + musicGameVariables.time.initialVoidTime + 2000);

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
                audio.unload();
                musicAudio.play();
                musicGameVariables.delay = performance.now() - musicGameVariables.time.startTime
            })
        })
    }


    //initialize game scene
    async function initRenderer() {
        //light and game objects
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 7);

        //renderer settings 
        gameRenderer.outputEncoding = THREE.sRGBEncoding;
        gameRenderer.physicallyCorrectLights = true;
        gameRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        gameRenderer.toneMappingExposure = 0.25;
        gameRenderer.setSize(window.innerWidth, window.innerHeight);
        gameRenderer.setPixelRatio(gameConfig.graphics.musicgame.resolution || 1);
        musicgameCanvasRef.current?.appendChild(gameRenderer.domElement);
        gameScene.name = "musicGameScene";
        notesContainer.name = "notesContainer";

        directionalLight.position.set(0, 10, 10);
        directionalLight.lookAt(0, 0, -10);

        camera.position.set(0, 8, 5);
        camera.rotation.set(THREE.MathUtils.degToRad(-38), 0, 0);

        gameScene.add(ambientLight, directionalLight, notesContainer);

        //post process
        const renderPass = new RenderPass(gameScene, camera);
        composer.addPass(renderPass);
        let AAPass: SSAARenderPass | SMAAPass | undefined = undefined;
        if (gameConfig.graphics.musicgame.postProcessing.enabled) {
            if (gameConfig.graphics.musicgame.postProcessing.antialias == "SSAA") {
                AAPass = new SSAARenderPass(gameScene, camera);
                AAPass.sampleLevel = gameConfig.graphics.musicgame.postProcessing.AALevel;
            }
            if (gameConfig.graphics.musicgame.postProcessing.antialias == "SMAA") AAPass = new SMAAPass(window.innerWidth, window.innerHeight);
            if (gameConfig.graphics.musicgame.postProcessing.antialias == "TAA") {
                AAPass = new TAARenderPass(gameScene, camera, "black", 1)
                AAPass.sampleLevel = gameConfig.graphics.musicgame.postProcessing.AALevel;
            }
            if (AAPass) composer.addPass(AAPass)
        }

        await setGround();
        await setCharacter();
        gameRenderInterval = setInterval(render, (gameConfig.graphics.musicgame.fps || 120) / 1000)
    }

    //ground
    async function setGround() {
        const groundGltf = (await getBehavior).model.models.ground;
        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(groundGltf)
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.receiveShadow = true;
        gameScene.add(model)
    }

    //character
    async function setCharacter() {
        const characterGltf = (await getBehavior).model.models.character;
        const gltf = await new GLTFLoader().loadFromArrayBufferAsync(characterGltf);
        character = gltf.scene;
        character.position.set(-9, 0, 0);
        character.rotation.set(0, 0, 0)
        character.castShadow = true;
        gameScene.add(character)
    }

    async function moveCharacter(position: ("left" | "right")) {
        const currentPos = character.position.x;
        const newPos = position == "left" ? -9 : 9;
        if (currentPos == newPos) return;
        const moveDistance = currentPos + newPos * 2;
        for (let i = 0; i < 100; i++) {
            const pos = easings.bounce(i / 100) * moveDistance / 100 + newPos;
            character.position.x = pos;
            await sleep(10);
        }

    }

    function render() {
        composer.render();
        updateGame();
    }

    //update notes position
    function updateGame() {
        if (!musicGameVariables.ready) return;
        const activeRange = musicGameVariables.activeRange
        const elapsedTime = performance.now() - musicGameVariables.time.startTime;
        const gameTime = elapsedTime - /* musicGameVariables.delay - */ gameConfig.gameplay.timing.offset;
        const judgeTime = gameTime - gameConfig.gameplay.timing.judge;
        musicGameVariables.time.elapsedTime = elapsedTime;
        musicGameVariables.time.gameTime = gameTime;
        musicGameVariables.time.judgeTime = judgeTime;

        for (const note of musicGameVariables.activeNotes) {
            if (note.judged) {
                note.active = false;
                notesContainer.remove(note.note);
                const index = musicGameVariables.activeNotes.findIndex(n => n == note);
                musicGameVariables.activeNotes.splice(index, 1);
            }
            else if (note instanceof seedNote && Math.abs(note.time - gameTime) < 25 && note.lane == musicGameVariables.inputs.position) managementJudge(note.judge(gameTime));
            else if (note.time + activeRange < judgeTime) managementJudge(note.judge(judgeTime))
            note.updatePosition(gameTime)
        }
        for (const note of chart.notes) {
            if (note.active) continue;
            if (note.time - Math.abs(gameTime) < note.scrollTime) {
                note.active = true;
                notesContainer.add(note.note);
                musicGameVariables.activeNotes.push(note);
            }

        }
    }

    //find note and judge.
    function judgeKeyPush(pos: 0 | 1 | 2 | 3 | 4) {
        const judgeTime = musicGameVariables.time.judgeTime;
        const activeRange = musicGameVariables.activeRange;

        if (pos < 4) {
            //find tap note and judge
            const note = musicGameVariables.activeNotes.find(note => note instanceof tapNote && note.lane == pos + 1 && Math.abs(note.time - judgeTime) < activeRange);
            console.log(note);

            if (note) managementJudge(note.judge(judgeTime));
        } else if (pos == 4) {
            //bright note
            const note = musicGameVariables.activeNotes.find(note => note instanceof brightNote && Math.abs(note.time - judgeTime) < activeRange);
            if (note) managementJudge(note.judge(judgeTime));
        }
    }

    function keyTouch(posX: number) {

    }

    //set score and some info
    function managementJudge(judge: { judge: judgeText, accuracy: number } | undefined) {
        if (!judge) return;
        let score = chart.metadata.scorePerNote;
        if (judge.judge == "glossy") score *= 0.75;
        else if (judge.judge == "moderate") score *= 0.5;
        else if (judge.judge == "lost") score = 0;


        //update score and some values
        setMusicGameNotesJudge(noteJudge => {
            const accuracy = ((noteJudge.accuracy * noteJudge.notesCount.current) + judge.accuracy) / (noteJudge.notesCount.current + 1)
            const judgeType = cloneDeep(noteJudge.judge);
            judgeType[judge.judge] = judgeType[judge.judge] + 1
            return {
                ...noteJudge,
                notesCount: {
                    ...noteJudge.notesCount,
                    current: noteJudge.notesCount.current + 1
                },
                accuracy: accuracy,
                judge: judgeType,
                timing: {
                    ...noteJudge.timing,
                    future: noteJudge.timing.future + (judge.accuracy < 0 ? 1 : 0),
                    past: noteJudge.timing.past + (judge.accuracy > 0 ? 1 : 0)
                }
            }
        })
        setMusicGameValue(value => {
            return {
                ...value,
                score: value.score + score,
                chain: judge.judge == "lost" ? 0 : value.chain + 1,
                maxChain: Math.max((judge.judge == "lost" ? 0 : value.chain + 1), value.maxChain)
            }
        })
    }

    return (
        <div>
            <div className={style.musicgameCanvas} ref={musicgameCanvasRef}></div>
            {/* <MusicGameRenderer render={false} /> */}
        </div>
    )
}

export default MusicGame3D;