const ENUSSettingsPage = {
    "general": {
        "title": "General",
        "language": {
            "name": "Language",
            "description": "Select your language."
        },
        "benchmark": {
            "name": "Benchmark",
            "description": "Run a benchmark to get the hint to the best settings for your device.",
            "button": "Run"
        },
        "terms": {
            "name": "Terms of Service",
            "description": "View the terms of service.",
            "button": "View"
        },
        "credit": {
            "name":"Credits",
            "description":"Credit \n Programmed by Mksk \n Music by Rae/Goners \n Illustlation by てぬ"
        }
    },
    "gameplay": {
        "title": "Gameplay",
        "keybind":{
            "name":"Key binds",
            "description": "Set key settings while playing music game."
        },
        "liveVisualization":{
            "name":"Live Visualization",
            "description":"Set show prediction/accuracy on UI while playing music game."
        },
        "scrollSpeed":{
            "name":"ScrollSpeed",
            "description":"Adjust notes scroll speed."
        },
        "offset":{
            "name":"Offset",
            "description": "Adjust the position of the notes relative to the music. \n If there are too many Future(Fast) notes, adjust the value to minus, and if there are too many Past(Late) notes, adjust the value to plus."
        },
        "judgeTiming": {
            "name": "Judgement gap",
            "description": "Adjust the notes judgment gap. \n If there are too many Future(Fast) notes, adjust the value to minus, and if there are too many Past(Late) notes, adjust the value to plus."
        }
    },
    "graphics": {
        "title": "Graphics",
        "gameResolution":{
            "name":"Game 3D resoution",
            "description": "Adjust quality of game 3D rendering.",
        },
        "gameAntiAliasing":{
            "name":"Game Anti-Aliasing",
            "description":"Set Anti-Aliasing behavior of game rendering."
        },
        "gameAASampling": {
            "name": "Game Anti-Aliasing level",
            "description": "Set Anti-Aliasing sampling quality for SSAA or TAA Game Anti-Alias."
        },
        "gameRenderType": {
            "name": "Game rendering type",
            "description": "Set rendering behavior of music game."
        },
        "gameFps": {
            "name": "FPS limit",
            "description": "Adjust framerate limit.\n This setting affects to judge accuracy."
        },
        "backgroundRenderType": {
            "name": "Background rendering type",
            "description": "Set rendering behavior of background."
        },
        "backgroundResolution": {
            "name": "Background  3D resoution",
            "description": "Adjust quality of background 3d rendering."
        },
        "backgroundFps": {
            "name": "Background FPS limit",
            "description": "Adjust framerate limit of 3d background."
        },
        "autoFullScreen": {
            "name": "Auto fullscreen",
            "description": "Enter fullscreen automaticaly when game starts."
        }
    },
    "audio": {
        "title": "Audio",
        "masterVolume": {
            "name": "Master volume",
            "description": "Adjust master volume."
        },
        "musicVolume": {
            "name": "Music volume",
            "description": "Adjust game music volume."
        },
        "effectVolume": {
            "name": "Effect volume",
            "description": "Adjust effect sound volume."
        }
    },
    "storage": {
        "title": "Storage",
    },
    "details": {
        "processingLoad": {
            "name": "Processing Load",
            "critical": "Critical",
            "high": "High",
            "medium": "Medium",
            "low": "Low",
            "none": "None",
        }
    }
}

export default ENUSSettingsPage;