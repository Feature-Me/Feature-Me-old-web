import { MusicAssetContents } from "dataController/resourcesUpdater/installMusic";
import {atom} from "recoil";

interface MusicSelectVariables {
    [x: string]: any;
    selected:string;
    selectedContentData:MusicAssetContents;
    search:string;
    showMusicList:Array<string>;
}

const musicSelectVarialbes = atom<MusicSelectVariables>({
    key: "musicSelectVariables",
    default: {
        selected:null,
        selectedContentData:null,
        search: "",
        showMusicList: [],
    }
});

export default musicSelectVarialbes;