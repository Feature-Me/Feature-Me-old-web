import {atom} from "recoil";

const quickmenuState = atom<boolean>({
    key:"quickmenuState",
    default:false
})

export default quickmenuState;