import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil"
import sceneChangerState from "State/sceneChanger/sceneChangerstate"
import sleep from "Utils/sleep/sleep";

const useSeneChangeNavigation = () => {
    const setSceneChanger = useSetRecoilState(sceneChangerState);
    const navigate = useNavigate();
    //@ts-ignore
    return (to: string):string => {
        setSceneChanger(scene => scene + 1);
        setTimeout(() => {
            navigate(to);
        }, 500);
    }
}

export default useSeneChangeNavigation;