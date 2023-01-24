const enviroment:enviroment = {
    language: navigator.language.toLowerCase().replace(/-/g, "_"),
    termsVersion: "0.0.0",
    termsAccepted: false,
    initializedSettings: false,
    userData: {
        name: "",
        id:""
    }
}

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

const musicSelect = {
    selected: "",
}

const DBVersion = {
    version: 0,
    initialized: false,
    updated: new Date().getDate(),
}


const gameConfig: gameConfig = {
    graphics: {
        background: {
            renderType: "2D",
            backgroundName: "default",
            resolution: 0.7,
            fps: 30,
            postProcessing: {
                AALevel: 0,
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
                AALevel: 0,
                antialias: "default",
                enabled: true,
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
        key: ["KeyD", "KeyF", "KeyJ", "KeyK", "Space", "KeyE", "KeyI"],
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
        },
        judgeText: {
            show: true,
            direction:0,
            position:-4
        }
    },
    audio: {
        masterVolume: 1,
        musicVolume: 1,
        effectVolume: 1,
        audioStereo:0,
        positional:false,
        positionalIntensity:1
    }
}



export {enviroment,resourcesDownloaded,DBVersion,gameConfig,musicSelect};