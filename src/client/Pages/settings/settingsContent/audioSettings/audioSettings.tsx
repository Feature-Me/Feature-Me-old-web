import ChamferdButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import SettingDetails, { settingDetailsData } from "../detailsPane/settingDetails";
import style from "../settingsContent.scss"

import RangeInput from "Components/RangeInput/RangeInput";

const AudioSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    const settings: Array<{ details: settingDetailsData, input: React.ReactNode }> = [
        {
            details: {
                title: <TranslateText content="settingsPage.audio.masterVolume.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.audio.masterVolume.description" />
            },
            input: <RangeInput min={0} max={1} step={0.01} value={gameConfig.audio.masterVolume} onChange={(value: number) => setGameConfig(config => { return { ...config, audio: { ...config.audio,masterVolume:value } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.audio.musicVolume.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.audio.musicVolume.description" />
            },
            input: <RangeInput min={0} max={1} step={0.01} value={gameConfig.audio.musicVolume} onChange={(value: number) => setGameConfig(config => { return { ...config, audio: { ...config.audio, musicVolume: value } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.audio.effectVolume.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.audio.effectVolume.description" />
            },
            input: <RangeInput min={0} max={1} step={0.01} value={gameConfig.audio.effectVolume} onChange={(value: number) => setGameConfig(config => { return { ...config, audio: { ...config.audio, effectVolume: value } } })} />
        },
    ]


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

export default AudioSettings;