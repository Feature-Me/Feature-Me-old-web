import { atom } from "recoil"

const musicRoomState = atom<MusicRoomStateType>({
    key:"musicRoomState",
    default:{
        musicList:[],
        playing:undefined,
        playList:[],
        playingIndex:0

    }
    
})

export default musicRoomState