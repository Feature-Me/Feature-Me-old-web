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
            interface gameConfig {
                graphics: {
                    background: {
                        renderType: string,
                        backgroundName: string,
                        resolution: number,
                        fps: number,
                        postProcessing: {
                            enabled: boolean,
                            antialias: false | "default" | "TAA" | "SMAA" | "SSAA",
                            ambientOcclusion: false | "SAO" | "SSAO",
                            bloom: boolean
                        }
                    },
                    musicgame: {
                        renderType: "3D" | "2D",
                        resolution: number,
                        fps: number,
                        postProcessing: {
                            enabled: boolean,
                            antialias: false | "default" | "TAA" | "SMAA" | "SSAA",
                            ambientOcclusion: false | "SAO" | "SSAO",
                            bloom: boolean
                        }
                    }
                },
                gameplay:{
                    key:Array<{code:number,key:string}>,
                    scrollSpeed:number,
                    mirror:boolean,
                    random:boolean,
                    fieldWall:false|number,
                    effect: {
                        cameraShaking: boolean,
                    }
                    timing:{
                        offset: number,
                        judge: number,
                    },
                    behavior: {
                        model: string,
                        audio: string,
                    }
                    background: {
                        mode: "solid" | "2d" | "3d",
                        color: string,
                        allowImage: boolean,
                        allowVideo: boolean,
                    },
                    visualization: {
                        enabled: boolean,
                        preset: "default" | "simple" | "advanced" | "custom",
                        acctualy: boolean,
                        maxScore: boolean,
                        predictionScore: boolean,
                        maxCombo: boolean,
                        predictionRating: boolean,
                    }
                },
                audio: {
                    masterVolume: number,
                    musicVolume: number,
                    effectVolume: number,
                },
            }
            const gameConfig: gameConfig = {
                graphics: {
                    background: {
                        renderType: "2D",
                        backgroundName: "default",
                        resolution: 0.7,
                        fps: 30,
                        postProcessing: {
                            enabled: false,
                            antialias: false,
                            ambientOcclusion: false,
                            bloom: false,
                        }
                    },
                    musicgame: {
                        renderType: "3D",
                        resolution: 1,
                        fps: 120,
                        postProcessing: {
                            antialias: false,
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
                    key: [
                        {code: 68,key: "d"},
                        {code: 70,key: "f"},
                        {code: 74,key: "j"},
                        {code: 75,key: "k"},
                        {code: 32,key: "space"},
                        {code: 69,key: "e"},
                        {code: 73,key: "i"}
                    ],
                    behavior: {
                        model: "default",
                        audio: "default",
                    },
                    effect: {
                        cameraShaking: true,
                    },
                    timing: {
                        offset: 0,
                        judge: 0,
                    },
                    background: {
                        mode: "2d",
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