import ChamferdButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import SettingDetails, { settingDetailsData, settingsData } from "../detailsPane/settingDetails";
import style from "../settingsContent.scss"

import RangeInput from "Components/RangeInput/RangeInput";
import ToggleSwitch from "Components/toggleSwitch/toggleSwitch";

const UserSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    const enviroment = JSON.parse(localStorage.getItem("environment")!) as enviroment
    let userData = enviroment.userData

    const settings: settingsData = [
        {
            details: {
                title: <TranslateText content="settingsPage.user.userName.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.user.userName.description" />
            },
            input: <input type="text" className={style.textInput} defaultValue={userData.name} onChange={setUserName} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.user.id.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.user.id.description" end={`\n ${userData.id}`} />
            },
            input: <></>
        },
        {
            details: {
                title: <TranslateText content="settingsPage.user.sessionId.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.user.sessionId.description" />
            },
            input: <></>
        },


    ]

    function setUserName(e: React.ChangeEvent<HTMLInputElement>){
        let name = e.target.value;
        userData.name = name;
        localStorage.setItem("environment",JSON.stringify({...enviroment,...userData}))
    }


    return (
        <div className={style.settings_content_wrapper}>
            <h1>{translate("settingsPage.audio.title")}</h1>
            <div className={style.content}>
                <div className={style.list} ref={settingListRef}>
                    {settings.map((setting, index) => {
                        const details = { ...setting.details };
                        return (
                            <div className={style.list_item} key={index} onMouseOver={() => setiSettingDetailsData(details)}>
                                <h4>{setting.details.title}</h4>
                                {setting.input}
                            </div>
                        )
                    })}
                </div>

                <div className={style.details}>
                    <SettingDetails data={settingDetailsData} />
                </div>
            </div>
        </div>
    )
}

export default UserSettings;