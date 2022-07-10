import React from "react";
import { toast } from "react-toastify";
import TranslateText from "global/TranslateText/translateText";

function initLocalStorage(): void {
    const toastId = toast.info(<TranslateText contentData="resourcesManager.cache.notifications.initializing"></TranslateText>);
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
                model: {
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

        if(!localStorage.getItem("gameConfig")){
            type gameConfig = {
                background:{
                    use3DBackground:boolean,
                    backgroundName:string,
                    resolution:number,
                    fps:number,
                    postProcessing:{
                        enabled:boolean,
                        antialias: false | "default" | "TAA"|"SMAA"|"SSAA",
                        ambientOcclusion:false|"SAO"|"SSAO",
                        bloom: boolean
                    }
                },
                musicgame:{
                    renderType:"3D"|"2D",
                    resolution:number,
                    fps: number,
                    postProcessing: {
                        enabled: boolean,
                        antialias: false | "default" | "TAA" | "SMAA" | "SSAA",
                        ambientOcclusion: false | "SAO" | "SSAO",
                        bloom: boolean
                    }
                }
            }
            const gameConfig:gameConfig = {
                background:{
                    use3DBackground: true,
                    backgroundName: "default",
                    resolution:0.8,
                    fps:45,
                    postProcessing: {
                        enabled: false,
                        antialias:false,
                        ambientOcclusion: false,
                        bloom: false,
                    }
                },
                musicgame:{
                    renderType:"3D",
                    resolution:1,
                    fps:120,
                    postProcessing: {
                        antialias:false,
                        enabled: false,
                        ambientOcclusion: false,
                        bloom: false,
                    }
                }
            }
            localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
            fixedCount++;
        }
        if(!localStorage.getItem("musicSelect")){
            const musicSelect = {
                selected: "",
            }
            localStorage.setItem("musicSelect", JSON.stringify(musicSelect));
        }
        toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.initialized"} end={<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} start={fixedCount.toString()} />} />);
        //toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} />);
    } catch (error) {
        console.error(error);
        toast.error(`${<TranslateText contentData={"resourcesManager.cache.notifications.initializingFailed"} />} : ${error}`);
    }
}

export default initLocalStorage;