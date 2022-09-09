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

import keybindImage from "Assets/Images/keybindmap.png";
import RangeInput from "Components/RangeInput/RangeInput";

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
                title: <TranslateText contentData="settingsPage.gameplay.scrollSpeed.name" />,
                processingLoad: "low",
                description: <TranslateText contentData="settingsPage.gameplay.scrollSpeed.description" />
            },
            input: <RangeInput min={0} max={20} step={0.1} value={gameConfig.gameplay.scrollSpeed} onChange={(value:number) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, scrollSpeed: value } } })} />
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