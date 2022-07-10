import {atom} from "recoil";

const musicSelectVarialbes = atom({
    key: "musicSelectVariables",
    default: {
        selected:null,
        search: "",
        musicList: [],
    }
});

export default musicSelectVarialbes;