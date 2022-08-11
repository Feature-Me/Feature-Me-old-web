import React from "react";
import { useNavigate } from "react-router";
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { CgMenuGridR } from "react-icons/cg"
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";

import sceneChangerState from "State/sceneChanger/sceneChangerstate";
import timeState from "State/timeState/timeState";

import style from "./head.scss";

const Head: React.FC<{ title: string, backFunc?: Function }> = (props) => {
    const [translation, i18n] = useTranslation();
    const [clock, setClock] = React.useState(new Date().toLocaleTimeString());
    let nowTime: Date = new Date();
    const hr = React.useRef<number>();
    const min = React.useRef<number>();
    const startedTime = useRecoilValue(timeState);
    const navigate = useNavigate();
    const setSceneChanger = useSetRecoilState(sceneChangerState);

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
        else {
            setSceneChanger(scene=>scene+1);
            setTimeout(() => {
                navigate(-1);
            }, 500);
        }
    }


    return (
        <div className={style.head}>
            <div className={style.icon_wrapper} onClick={backFunc}>
                <MdOutlineArrowBackIosNew className={style.icon} />
            </div>
            <h4>
                {props.title}
            </h4>
            <div></div>
            <h4>
                {clock} ({hr.current}{translation("head.hr")}:{min.current}{translation("head.min")} {translation("head.sessiontime")})
            </h4>
            <div className={style.icon_wrapper}>
                <CgMenuGridR className={style.icon} />
            </div>
        </div>
    )
}

export default Head;
