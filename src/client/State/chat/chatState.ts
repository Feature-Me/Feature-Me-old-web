import { atom } from "recoil";

const firstMsg: chatMessageType = {
    name: "SYSTEM",
    time: Date.now(),
    content: "This is the biginning of the chat.\nThe message which starting // is recognized as a command. Send//help to show commands."
}



const chatState = atom<chatStateType>({
    key: "chatState",
    default: {
        room: "global",
        rooms: {
            global: [firstMsg],
            room: [firstMsg]
        }
    }
})

export default chatState;