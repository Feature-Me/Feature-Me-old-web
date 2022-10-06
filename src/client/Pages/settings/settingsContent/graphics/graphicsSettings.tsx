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
import HorizonalSelectFromArray from "Components/horizonalSelectFromArray/horizonalSelectFromArray";

const GraphicsSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    //render type
    const renderType: Array<selectContents> = [
        {
            label: "2D",
            value: "2D"
        },
        {
            label: "3D",
            value: "3D"
        }
    ]

    //Anti-Aliasing type
    const AAType: Array<selectContents> = [
        { label: "Disabled", value: false },
        { label: "System", value: "default" },
        { label: "SSAA", value: "SSAA" },
        { label: "SMAA", value: "SMAA" },
        { label: "TAA", value: "TAA" }
    ]
    //AA subpixel
    const AASampling: Array<selectContents> = [
        { label: "1X", value: 0 },
        { label: "2X", value: 1 },
        { label: "4X", value: 2 },
        { label: "8X", value: 3 },
        { label: "16X", value: 4 },
        { label: "32X", value: 5 }
    ]

    const settings: Array<{ details: settingDetailsData, input: React.ReactNode }> = [
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.gameRenderType.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.gameRenderType.description" />
            },
            input: <HorizonalSelectFromArray contents={renderType} value={renderType.find(c => c.value == gameConfig.graphics.musicgame.renderType) || renderType[0]} onChange={(value: selectContents) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...gameConfig.graphics.musicgame, renderType: value.value as "2D" | "3D" } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.gameAntiAliasing.name" />,
                processingLoad: "medium",
                description: <TranslateText content="settingsPage.graphics.gameAntiAliasing.description" />
            },
            input: <HorizonalSelectFromArray contents={AAType} value={AAType.find(c => c.value == gameConfig.graphics.musicgame.postProcessing.antialias) || AAType[0]} onChange={(value: selectContents) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...gameConfig.graphics.musicgame, postProcessing: { ...gameConfig.graphics.musicgame.postProcessing, antialias: value.value as AntiAliasType } } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.gameAASampling.name" />,
                processingLoad: "medium",
                description: <TranslateText content="settingsPage.graphics.gameAASampling.description" />
            },
            input: <HorizonalSelectFromArray contents={AASampling} value={AASampling.find(c => c.value == gameConfig.graphics.musicgame.postProcessing.AALevel) || AASampling[0]} onChange={(value: selectContents) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...gameConfig.graphics.musicgame, postProcessing: { ...gameConfig.graphics.musicgame.postProcessing, AALevel: value.value as AALevel } } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.gameResolution.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.gameResolution.description" />
            },
            input: <RangeInput min={0.1} max={3} step={0.01} value={gameConfig.graphics.musicgame.resolution} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...config.graphics.musicgame, resolution: value } } } })} />
        },
        {
            details: {
                title: < TranslateText content="settingsPage.graphics.gameFps.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.gameFps.description" />,
            },
            input: <RangeInput min={30} max={480} step={1} value={gameConfig.graphics.musicgame.fps} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, musicgame: { ...config.graphics.musicgame, fps: value } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.backgroundRenderType.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.backgroundRenderType.description" />
            },
            input: <HorizonalSelectFromArray contents={renderType} value={renderType.find(c => c.value == gameConfig.graphics.background.renderType) || renderType[0]} onChange={(value: selectContents) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, background: { ...gameConfig.graphics.background, renderType: value.value as "2D" | "3D" } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.graphics.backgroundResolution.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.backgroundResolution.description" />
            },
            input: <RangeInput min={0.1} max={3} step={0.01} value={gameConfig.graphics.background.resolution} onChange={(value: number) => setGameConfig(config => { return { ...config, graphics: { ...config.graphics, background: { ...config.graphics.background, resolution: value } } } })} />
        },
        {
            details: {
                title: < TranslateText content="settingsPage.graphics.backgroundFps.name" />,
                processingLoad: "high",
                description: <TranslateText content="settingsPage.graphics.backgroundFps.description" />,
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