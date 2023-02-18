import { Howl, HowlOptions } from "howler";

function playAudio(options: HowlOptions | string, useMastervolume: boolean = true): Howl {
    const data = typeof options == "string" ? { src: options } : options
    const audio = new Howl({
        ...data
    });
    audio.play();

    audio.once("end", () => audio.unload());

    return audio;
}

export default playAudio;