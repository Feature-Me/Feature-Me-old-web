import {atom} from 'recoil';

const backgroundState = atom<{name:string,renderer:string,showed:boolean}>({
    key: 'backgroundState',
    default: {
        name:JSON.parse(localStorage.getItem("gameConfig") || "{}").background?.backgroundName || "default",
        renderer:JSON.parse(localStorage.getItem("gameConfig") || "{}")?.graphics?.background?.renderType || "2D",
        showed: false,
    }
});

export default backgroundState;