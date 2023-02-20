import { Setter } from "solid-js";
import { Howler } from "howler";
import { gameConfig } from "Utils/Storage/LocalStorage/defaultValue";

function setupAudioFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {
        setTitle("appLoader.audio.title");
        setDescription("appLoader.audio.description")
        const data: gameConfig = JSON.parse(localStorage.getItem("gameConfig") || JSON.stringify(gameConfig));
        let volume = data.audio.masterVolume || 1;
        try {
            volume = data.audio.masterVolume;
        } catch (e) {
            console.log(e);
            volume = 1;
        }
        Howler.volume(volume)
        resolve();
    })
}

export default setupAudioFromLoader;