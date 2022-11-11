import { chartType } from "Features/play/parseChart/chartSample"

interface gameProps {
    ready: boolean
    data: {
        chart: chartType |undefined
        music: musicData | undefined
        behavior: {
            model: behaviorAssetContents | undefined
            sound: soundEffectAssetContents | undefined
            font: fontAssetContents | undefined
        }
    }
    
}


interface gameData {
    ready: boolean
    data: {
        chart: chartType 
        music: musicData 
        behavior: {
            model: behaviorAssetContents 
            sound: soundEffectAssetContents 
            font: fontAssetContents 
        }
    }

}