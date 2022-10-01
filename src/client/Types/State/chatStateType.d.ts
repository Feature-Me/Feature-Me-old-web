interface chatStateType {
    room: string
    rooms: { [key: string]: Array<chatMessageType> }
}

interface chatMessageType {
    name: string
    time: number
    content: string
}