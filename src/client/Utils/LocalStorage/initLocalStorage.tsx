import React from "react";
import { toast } from "react-toastify";
import TranslateText from "../../Components/TranslateText/TranslateText";


function initLocalStorage(): void {
    let fixedCount = 0;
    try {
        if (!localStorage.getItem("environment")) {
            const enviroment = {
                language: navigator.language.toLowerCase().replace(/-/g, "_"),
                termsVersion: "0.0.0",
                termsAccepted: false,
                initializedSettings: false,
            }
            localStorage.setItem("environment", JSON.stringify(enviroment));
            fixedCount++;
        }

        if (!localStorage.getItem("ResourcesDownloaded")) {
            const resourcesDownloaded = {
                background: {
                    initialized: false,
                    version: "0.0.0"
                },
                behavior: {
                    initialized: false,
                    version: "0.0.0"
                },
                music: {
                    initialized: false,
                    version: "0.0.0"
                }
            }
            localStorage.setItem("ResourcesDownloaded", JSON.stringify(resourcesDownloaded));
            fixedCount++;
        }

        if (!localStorage.getItem("DBVersion")) {
            const DBVersion = {
                version: 0,
                initialized: false,
                updated: new Date().getDate()
            }
            localStorage.setItem("DBVersion", JSON.stringify(DBVersion));
            fixedCount++;
        }

        if (!localStorage.getItem("gameConfig")) {
            const gameConfig: gameConfig = {
                graphics: {
                    background: {
                        renderType: "2D",
                        backgroundName: "default",
                        resolution: 0.7,
                        fps: 30,
                        postProcessing: {
                            enabled: false,
                            antialias: "default",
                            ambientOcclusion: false,
                            bloom: false,
                        }
                    },
                    musicgame: {
                        renderType: "3D",
                        behaviorName: "default",
                        resolution: 1,
                        fps: 120,
                        postProcessing: {
                            antialias: "default",
                            enabled: false,
                            ambientOcclusion: false,
                            bloom: false,
                        }
                    }
                },
                gameplay: {
                    scrollSpeed: 10,
                    mirror: false,
                    random: false,
                    fieldWall: false,
                    key: ["KeyD","KeyF","KeyJ","KeyK","Space","KeyE","KeyI"],
                    behavior: {
                        model: "default",
                        sound: "default",
                        font: "default"
                    },
                    effect: {
                        cameraShaking: true,
                    },
                    timing: {
                        offset: 0,
                        judge: 0,
                    },
                    background: {
                        mode: "2D",
                        color: "#000000",
                        allowImage: true,
                        allowVideo: true,
                    },
                    visualization: {
                        enabled: false,
                        preset: "default",
                        acctualy: false,
                        maxScore: false,
                        predictionScore: false,
                        maxCombo: false,
                        predictionRating: false,
                    }
                },
                audio: {
                    masterVolume: 1,
                    musicVolume: 1,
                    effectVolume: 1,
                }
            }
            localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
            fixedCount++;
        }
        if (!localStorage.getItem("musicSelect")) {
            const musicSelect = {
                selected: "",
            }
            localStorage.setItem("musicSelect", JSON.stringify(musicSelect));
        }
        if(fixedCount > 0) toast.success(<TranslateText contentData = { "resourcesManager.cache.notifications.fixed"} start = { fixedCount.toString() } />);
    //toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} />);
} catch (error) {
    console.error(error);
    toast.error(`${error}`);
    }
}

export default initLocalStorage;