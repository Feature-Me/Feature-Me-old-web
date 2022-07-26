import {atom} from 'recoil';

const gameConfigState = atom({
    key: 'gameConfig',
    default: JSON.parse(localStorage.getItem("gameConfig") || "{}")
})

export default gameConfigState;