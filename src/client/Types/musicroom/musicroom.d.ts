interface MusicRoomCategories {
    data:Array<MusicRoomContents>
    thumbnail:{
        data:ArrayBuffer
        mime:string
    }
    title:string
    composer:string
}

interface MusicRoomContents {
    data:{
        data: ArrayBuffer
        mime: string
    }
    name:string
    category:MusicRoomCategories
}

interface MusicRoomStateType {
    musicList: Array<MusicRoomCategories>
    playing: MusicRoomContents | undefined
    playList: Array<MusicRoomContents>
    playingIndex:number
}