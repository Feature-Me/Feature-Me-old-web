import { Setter } from "solid-js";
import { Howler } from "howler";

function connectToWebSocket(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {
        setTitle("appLoader.audio.title");
        setDescription("appLoader.audio.description")
        const data: gameConfig = JSON.parse(localStorage.getItem("gameConfig") || "{}");
        let volume = 1;
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

export default connectToWebSocket;