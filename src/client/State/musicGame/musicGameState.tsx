import {atom} from "recoil"
import { number } from "ts-pattern/dist/patterns"


const musicGameState = atom<MusicGameStateType>({
    key: "musicGameState",
    default: {
        difficulty:"",
        mode:"",
        score:0,
        chain:0,
        accualy: 0,
        maxScore:0,
        maxChain:0,
        bpm: 0,
        judge:{
            stunninng:0,
            glossy:0,
            moderate:0,
            lost:0
        },
        timing:{
            future:0,
            past:0
        },
        prediction:{
            score:0,
            rating:0
        }
    }

})

export default musicGameState;