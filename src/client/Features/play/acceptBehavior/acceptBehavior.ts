import { chartType } from "Features/play/parseChart/chartSample";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { match } from "ts-pattern";
import { fontAssetContents, fontTable, FPTable } from "Types/resources/fontResources";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";

async function acceptBehavior(chart: chartType, models: behaviorAssetContents, font: fontAssetContents, sound: soundEffectAssetContents, volume: number) {

    let behaviors = {
        tap: new GLTFLoader().loadFromArrayBufferAsync(models.models.tap),
        damagetap: new GLTFLoader().loadFromArrayBufferAsync(models.models.damageTap),
        hold: new GLTFLoader().loadFromArrayBufferAsync(models.models.hold),
        bright: new GLTFLoader().loadFromArrayBufferAsync(models.models.bright),
        seed: new GLTFLoader().loadFromArrayBufferAsync(models.models.seed),
        flick: new GLTFLoader().loadFromArrayBufferAsync(models.models.flick),
    };

    let sounds = {
        tap: `data:${sound.sound.tap.mime};base64,${arrayBufferToBase64(sound.sound.tap.data)}`,
        damagetap: `data:${sound.sound.damage.mime};base64,${arrayBufferToBase64(sound.sound.damage.data)}`,
        hold: `data:${sound.sound.hold.mime};base64,${arrayBufferToBase64(sound.sound.hold.data)}`,
        bright: `data:${sound.sound.bright.mime};base64,${arrayBufferToBase64(sound.sound.bright.data)}`,
        seed: `data:${sound.sound.seed.mime};base64,${arrayBufferToBase64(sound.sound.seed.data)}`,
        flick: `data:${sound.sound.flick.mime};base64,${arrayBufferToBase64(sound.sound.flick.data)}`,
    }

    

    /*     const getBehavior = (type:keyof typeof behaviors) => {
            return match(type)
            .with("tap",(type)=>{
                return behaviors.tap
            })
            .with("damagetap",(type)=>{
                return behaviors.damagetap
            })
            .with("hold",(type)=>{
                return behaviors.hold
            })
            .with("bright",(type)=>{
                return behaviors.bright
            })
            .with("seed",(type)=>{
                return behaviors.seed
            })
            .with("flick",(type)=>{
                return behaviors.flick
            })
            .exhaustive()
        } */



    for (let note of chart.notes) {
        const model = await behaviors[note.type]

        note.setBehavior(model);
        note.setAudio(sounds[note.type], volume);
        /* getBehavior(note.type).then((behavior)=>{
            note.setBehavior(behavior.scene.clone());
        }); */
    }

    return chart;

}

export default acceptBehavior;