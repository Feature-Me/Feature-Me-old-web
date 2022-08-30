import ChamferdButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import SettingDetails, { settingDetailsData } from "../detailsPane/settingDetails";
import style from "../settingsContent.scss"
import KeybindSettings from "./keybindSettings/keybindSettings";

import keybindImage from "../../../../Assets/Images/keybindmap.png";

const GameplaySettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    const settings: Array<{ details: settingDetailsData, input: React.ReactNode }> = [
        {
            details: {
                title: <TranslateText contentData="settingsPage.gameplay.keybind.name" />,
                processingLoad: "none",
                description: <><TranslateText contentData="settingsPage.gameplay.keybind.description" /><img src={keybindImage}/></>
            },
            input: <KeybindSettings />
        },
        {
            details: {
                title: <TranslateText contentData="settingsPage.gameplay.details.name" />,
                processingLoad: "none",
                description: <TranslateText contentData="settingsPage.gameplay.details.description" />
            },
            input: <></>
        }
    ]


    return (
        <div className={style.settings_content_wrapper}>
            <h1>{translate("settingsPage.gameplay.title")}</h1>
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

export default GameplaySettings;