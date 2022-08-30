import { NavigateOptions, To, useNavigate } from "react-router";
import { useSetRecoilState } from "recoil"
import sceneChangerState from "State/sceneChanger/sceneChangerstate"
import sleep from "Utils/sleep/sleep";

const useSeneChangeNavigation = () => {
    const setSceneChanger = useSetRecoilState(sceneChangerState);
    const navigate = useNavigate();
    return (to: To|number , options?:NavigateOptions):void => {
        setSceneChanger(scene => scene + 1);
        setTimeout(() => {
            if(typeof to === "number")navigate(to);
            else navigate(to, options);
        }, 500);
    }
}

export default useSeneChangeNavigation;