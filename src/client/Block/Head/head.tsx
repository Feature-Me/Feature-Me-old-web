import React from "react";
import { useNavigate } from "react-router";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { CgMenuGridR } from "react-icons/cg"
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import sceneChangerState from "State/sceneChanger/sceneChangerstate";
import timeState from "State/timeState/timeState";

import style from "./head.scss";
import webSocketState from "State/webSocket/webSocketState";
import quickmenuState from "State/quickmenu/quickmenuState";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

const Header: React.FC<{ title: string, backFunc?: Function }> = (props) => {
    const [translation, i18n] = useTranslation();
    const navigate = useSeneChangeNavigation();
    const setSceneChanger = useSetRecoilState(sceneChangerState);
    const setQuickmenu = useSetRecoilState(quickmenuState);
    const webSocket = useRecoilValue(webSocketState);

    const [clock, setClock] = React.useState(new Date().toLocaleTimeString());
    let nowTime: Date = new Date();
    const hr = React.useRef<number>();
    const min = React.useRef<number>();
    const startedTime = useRecoilValue(timeState);

    

    React.useEffect(() => {
        const timeInterval = setInterval(() => {
            nowTime = new Date();

            hr.current = Math.floor((nowTime.getTime() - startedTime.started.getTime()) / 3600000)
            min.current = Math.floor(((nowTime.getTime() - startedTime.started.getTime()) / 60000) - hr.current * 60)
            setClock(nowTime.toLocaleTimeString());
        }, 1000);
        return () => {
            if (timeInterval) clearInterval(timeInterval);
        }
    }, []);

    function backFunc() {
        if (props.backFunc) props.backFunc();
        else navigate(-1);
    }

    function setQuickMenuState(){
        setQuickmenu(menu=>{
            return !menu
        })
    }


    return (
        <header className={style.header}>
            <div className={style.headbar}>
                <div className={style.icon_wrapper} onClick={backFunc}>
                    <MdOutlineArrowBackIosNew className={style.icon} />
                </div>
                <h4>
                    {props.title}
                </h4>
                <div></div>
                <h4>
                    {clock} ({hr.current}{translation("head.hr")}:{min.current}{translation("head.min")} {translation("head.sessionTime")})
                </h4>
                <div className={style.wsStateWrapper}>
                    <div className={style[webSocket.state]}></div>
                </div>
                <div className={style.icon_wrapper} onClick={setQuickMenuState}>
                    <CgMenuGridR className={style.icon} />
                </div>
            </div>
        </header>
    )
}

export default Header;
