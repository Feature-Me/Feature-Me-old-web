import { atom } from 'recoil';

const webSocketState = atom<webSocketState>({
    key: 'webSocketState',
    default: {
        user:{
            name:"",
            id:""
        },
        state:"offline",
        connectedTime:0
    }
});

export default webSocketState;