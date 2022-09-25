import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { match } from "ts-pattern";

import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import gameConfigState from "State/gameConfig/gameConfig";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import * as musicGame from "State/musicGame/musicGameState"
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

import Header from "Block/head/head";

import style from "./musicGameUI.scss";
import MusicGameTitle from "./musicGameTitle";

const MusicGameUI: React.FC = () => {
    const scenechange = useSeneChangeNavigation();
    const selectedMusic = useRecoilValue(musicSelectorState);
    const gameConfig = useRecoilValue(gameConfigState);

    const musicGameValue = useRecoilValue(musicGame.musicGameValueState);
    const musicGameNotesJudge = useRecoilValue(musicGame.musicGameNotesJudgeState);
    const musicGamePrediction = useRecoilValue(musicGame.musicGamePredictionState);
    const musicGameUIState = useRecoilValue(musicGame.musicGameUIState);
    const musicGameTime = useRecoilValue(musicGame.musicGameTimeState);
    const [musicGamePause, setMusicGamePause] = useRecoilState(musicGame.musicGamePauseState);
    const [musicGameMode, setMusicGameMode] = useRecoilState(musicGame.musicGameModeState);

    const musicData = selectedMusic.selectedData as MusicAssetContents
    const musicLevel = musicData.metadata.difficulties.find(d => d.name == musicGameMode.difficulty);

    //4 boards
    const primaryBoardRef = React.useRef<HTMLDivElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const progressPointRef = React.useRef<HTMLDivElement>(null);
    const secondaryBoardRef = React.useRef<HTMLDivElement>(null);
    const tertiaryBoardRef = React.useRef<HTMLDivElement>(null);

    const pauseOverlayRef = React.useRef<HTMLDivElement>(null);

    const leftBoardAnimationController = useAnimation();
    const rightBoardAnimationController = useAnimation();
    const pauseMenuAnimationController = useAnimation();

    const initialLeftBoard = {
        x: "-20%",
        opacity: 0,
    }

    const slideFadeInFromLeft = {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "circOut",
        }

    }

    const initialRightBoard = {
        x: "20%",
        opacity: 0,
    }
    const slideFadeInFromRight = {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "circOut",
        }
    }

    const initPauseMenu = {
        opacity: 0,
        scale: 0.8,
    }

    const pauseMenuAnimation = {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
        }
    }

    const pauseMenuAnimationOut = {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.2,
        }
    }

    const thumbnail = `data:${musicData.metadata.thumbnail.mime};base64,${arrayBufferToBase64(musicData.metadata.thumbnail.data)}`;

    //level. if constant > 4 , it displays "level+" ex:11+
    //constant is 0-9
    const diff = (musicLevel?.level || "0") + (((musicLevel?.constant || 0) > 4) ? "+" : "");

    const diffClass = (diff: musicDifficulties) => {
        return match(diff)
            .with("memory", () => style.memory)
            .with("advance", () => style.advance)
            .with("prospects", () => style.prospects)
            .with("ozma", () => style.ozma)
            .with("", () => style.memory)
            .exhaustive()
    }

    function setPause(e: KeyboardEvent) {
        if (musicGameMode.mode == "multi-royale" || musicGameMode.mode == "multi-team" || !musicGamePause.ready) return;
        if (e.code == "Escape") {
            setMusicGamePause(game => {
                return {
                    ...game,
                    paused: !game.paused
                }
            })
        }
    }

    function scaleUI() {
        if (primaryBoardRef.current && secondaryBoardRef.current && tertiaryBoardRef.current) {
            const h = window.innerHeight / 1080;
            const w = window.innerWidth / 1920;
            const scale = Math.min(h, w);
            primaryBoardRef.current.style.transform = `scale(${scale})`;
            secondaryBoardRef.current.style.transform = `scale(${scale})`;
            tertiaryBoardRef.current.style.transform = `scale(${scale})`;
        }
    }

    React.useEffect(() => {
        if (primaryBoardRef.current) {
            primaryBoardRef.current.classList.add(diffClass(musicGameMode.difficulty));
        }

        scaleUI();

        window.addEventListener("keydown", setPause);
        window.addEventListener("resize", scaleUI);
        return () => {
            window.removeEventListener("keydown", setPause);
            window.removeEventListener("resize", scaleUI);
        }
    }, [])

    React.useEffect(() => {
        console.log(musicGamePause.ready);
        const uiTimeout = setTimeout(() => {
            if (musicGamePause.ready) {
                leftBoardAnimationController.start(slideFadeInFromLeft);
                rightBoardAnimationController.start(slideFadeInFromRight);
            }
        }, 3500);
        return () => {
            clearTimeout(uiTimeout)
        }

    }, [musicGamePause.ready])

    React.useEffect(() => {
        if (musicGameTime.totalTime == 0) return;
        console.log("Total Time:", musicGameTime.totalTime);

        let changeSceneTimeout: NodeJS.Timeout
        const progressInterval = setInterval(() => {
            if (!progressRef.current || !progressPointRef.current) return;
            const progress = (performance.now() - musicGameTime.startedTime) / musicGameTime.totalTime * 100
            if (progress < 100) {
                progressRef.current.style.backgroundSize = `${progress}%`;
                progressPointRef.current.style.left = `${progress}%`;

            }
            if (progress >= 100 && !musicGamePause.paused) {
                setMusicGamePause(pause => {
                    return {
                        ...pause,
                        paused: true
                    }
                });
            }
        }, 100);
        return () => {
            clearInterval(progressInterval);
        }
    }, [musicGameTime.totalTime])

    React.useEffect(() => {
        if (!musicGamePause.ready) return;
        console.log("paused", musicGamePause.paused);
        let timeout: NodeJS.Timeout;
        if (!pauseOverlayRef.current) return;
        if (performance.now() - musicGameTime.totalTime) return;
        if (musicGamePause.paused) {
            pauseOverlayRef.current.style.visibility = "visible";
            pauseMenuAnimationController.start(pauseMenuAnimation);
        } else {
            pauseMenuAnimationController.start(pauseMenuAnimationOut);
            timeout = setTimeout(() => {
                if (pauseOverlayRef.current) pauseOverlayRef.current.style.visibility = "hidden";
            }, 300);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [musicGamePause.paused])



    return (
        <div className={style.musicgameUI} >
            <motion.div className={style.primary_board} ref={primaryBoardRef} animate={leftBoardAnimationController} initial={initialLeftBoard}>
                <div className={style.difficulty}>
                    <div className={style.level}>{diff}</div>
                    <h3>{musicGameMode.difficulty.toUpperCase()}</h3>
                </div>
                <div className={style.musicData}>
                    <img src={thumbnail} alt="" />
                    <div className={style.title}>
                        <p>{musicData.metadata.composer}</p>
                        <h3>{musicData.metadata.title}</h3>
                    </div>
                </div>
                <div className={style.progress} ref={progressRef}>
                    <div className={style.progressPoint} ref={progressPointRef}></div>
                </div>
                <div className={style.score}>
                    <span>Score</span>
                    <h2>
                        {/*to string and zero padding 0000000 musicGame.score */}
                        {Math.round(musicGameValue.score).toString().padStart(7, "0")}
                    </h2>
                </div>
            </motion.div>

            <motion.div className={style.secondary_board} ref={secondaryBoardRef} animate={leftBoardAnimationController} initial={initialLeftBoard}>
                <p><span>Stunning :</span> <span>{musicGameNotesJudge.judge.stunning}</span></p>
                <p><span>Glossy :</span> <span>{musicGameNotesJudge.judge.glossy}</span></p>
                <p><span>Moderate :</span> <span>{musicGameNotesJudge.judge.moderate}</span></p>
                <p><span>Lost :</span> <span>{musicGameNotesJudge.judge.lost}</span></p>
            </motion.div>

            <motion.div className={style.tertiary_board} ref={tertiaryBoardRef} animate={rightBoardAnimationController} initial={initialRightBoard}>
                <p><span>Future :</span> <span>{musicGameNotesJudge.timing.future}</span></p>
                <p><span>Past :</span> <span>{musicGameNotesJudge.timing.past}</span></p>
                <p><span>Max Chain :</span> <span>{musicGameValue.maxChain}</span></p>
                <p><span>Accuracy :</span> <span>{musicGameNotesJudge.accuracy}</span></p>
                <p><span>Prediction Score :</span>{musicGamePrediction.score}</p>
                <p><span>Prediction Rating :</span>{musicGamePrediction.rating}</p>
                <p><span>Scroll Speed :</span> <span>{0}</span></p>
                <p><span>Current BPM :</span>{musicGameValue.bpm}</p>
                <p><span>Mirror :</span> <span>OFF</span></p>
                <p><span>Notes :</span> <span>{musicGameNotesJudge.notesCount.current}/{musicGameNotesJudge.notesCount.all}</span></p>
            </motion.div>

            <motion.div className={style.pause_overlay} ref={pauseOverlayRef} animate={pauseMenuAnimationController} initial={initPauseMenu}>
                <Header title={`Paused - ${musicData.metadata.title}`} backFunc={() => setMusicGameMode(game => { return { ...game, paused: false } })} />
                <div className={style.pause_content}>
                    <p>Resume</p>
                    <p onClick={() => scenechange(-1)}>Restart</p>
                    <p onClick={() => scenechange(-2)}>Quit</p>
                </div>
            </motion.div>

            <MusicGameTitle />
        </div>
    );
}

export default MusicGameUI;