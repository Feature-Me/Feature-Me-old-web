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

const GraphicsSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    const settings: Array<{ details: settingDetailsData, input: React.ReactNode }> = [
        {
            details: {
                title: <TranslateText contentData="settingsPage.graphics.gameResolution.name" />,
                processingLoad: "high",
                description: <TranslateText contentData="settingsPage.graphics.gameResolution.description" />
            },
            input: <RangeInput min={0.1} max={3} step={0.01} value={gameConfig.graphics.musicgame.resolution} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...config.graphics.musicgame, resolution: value } } } })} />
        },
        {
            details: {
                title: < TranslateText contentData="settingsPage.graphics.gameFps.name" />,
                processingLoad:"high",
                description: <TranslateText contentData="settingsPage.graphics.gameFps.description" />,
            },
            input: <RangeInput min={30} max={480} step={1} value={gameConfig.graphics.musicgame.fps} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...config.graphics.musicgame, fps: value } } } })} />
        },
        {
            details: {
                title: <TranslateText contentData="settingsPage.graphics.backgroundResolution.name" />,
                processingLoad: "high",
                description: <TranslateText contentData="settingsPage.graphics.backgroundResolution.description" />
            },
            input: <RangeInput min={0.1} max={3} step={0.01} value={gameConfig.graphics.background.resolution} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, background: { ...config.graphics.background, resolution: value } } } })} />
        },
        {
            details: {
                title: < TranslateText contentData="settingsPage.graphics.backgroundFps.name" />,
                processingLoad: "high",
                description: <TranslateText contentData="settingsPage.graphics.backgroundFps.description" />,
            },
            input: <RangeInput min={1} max={480} step={1} value={gameConfig.graphics.background.fps} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, background: { ...config.graphics.background, fps: value } } } })} />
        }
    ]


    return (
        <div className={style.settings_content_wrapper}>
            <h1>{translate("settingsPage.graphics.title")}</h1>
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

export default GraphicsSettings;