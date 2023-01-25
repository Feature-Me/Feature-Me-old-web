interface gameConfig {
    graphics: {
        background: {
            renderType: "3D" | "2D",
            backgroundName: string
            resolution: number
            fps: number
            postProcessing: {
                enabled: boolean
                antialias: AntiAliasType
                AALevel:AALevel
                ambientOcclusion: boolean
                bloom: boolean
            }
        }
        musicgame: {
            renderType: "3D" | "2D"
            behaviorName: string
            resolution: number
            fps: number
            postProcessing: {
                enabled: boolean
                antialias: AntiAliasType
                AALevel:AALevel
                ambientOcclusion: boolean
                bloom: boolean
            }
        }
    }
    gameplay: {
        key: Array<string>
        scrollSpeed: number
        mirror: boolean
        random: boolean
        fieldWall: false | number
        effect: {
            cameraShaking: boolean
        }
        timing: {
            offset: number
            judge: number
        }
        behavior: {
            model: string
            sound: string
            font: string
        }
        background: {
            mode: "solid" | "2D" | "3D"
            color: string
            allowImage: boolean
            allowVideo: boolean
        }
        visualization: {
            enabled: boolean
            preset: "default" | "simple" | "advanced" | "custom"
            acctualy: boolean
            maxScore: boolean
            predictionScore: boolean
            maxCombo: boolean
            predictionRating: boolean
        }
        judgeText:{
            show:boolean
            direction:number
            position:number
        }
    }
    audio: {
        masterVolume: number
        musicVolume: number
        effectVolume: number
        audioStereo: number
        positional: boolean
        positionalIntensity:number
    }
}

type AntiAliasType = false | "default" | "TAA" | "SMAA" | "SSAA" | "FXAA"
type AALevel = 0 | 1 | 2 | 3 | 4 | 5