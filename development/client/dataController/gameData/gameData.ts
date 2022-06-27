import React from "react";
import { Root } from "react-dom/client";

declare global {
    var gameData: gameData;
}

type gameData = {
    startedTime: Date,
    background: { data: ArrayBuffer, alt?: string, all: string[], renderer: { container:React.MutableRefObject<HTMLDivElement>|null,engine:THREE.WebGLRenderer | THREE.WebGL1Renderer | null} };
    page: {
        current: React.FC | null,
        container:React.MutableRefObject<HTMLDivElement>|null,
        allPages: { [key: string]: React.FC },
        root:Root|null,
    },
    sceneChangerOpened:{
        value: boolean|null,
        setter: React.Dispatch<React.SetStateAction<boolean>>|null
    }
    gameObjects: {};
    titleBackgroundOpened:{
        value:boolean|null,
        setter:React.Dispatch<React.SetStateAction<boolean>>|null
    }
    /* musicMetaData: any[];
    replayMetaData: any[]; */
}

var gameData: gameData = gameData = {
    startedTime: new Date(),
    background: {
        data: new ArrayBuffer(0),
        all: [""],
        renderer: {
            container: null,
            engine: null,
        }
    },
    sceneChangerOpened:{
        value: null,
        setter:null
    },
    page: {
        current: null,
        container: null,
        allPages: {},
        root: null,
    },
    gameObjects: {},
    titleBackgroundOpened:{
        value:null,
        setter:null
    }
}

export default gameData;