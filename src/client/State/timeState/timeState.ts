import { atom } from "recoil";

const timeState = atom({
    key: "timeState",
    default: {
        started: new Date(),
    }
});

export default timeState;