import {atom} from 'recoil';

const sceneChangerState = atom<number>({
    key: 'sceneChangerState',
    default: 0
});

export default sceneChangerState;