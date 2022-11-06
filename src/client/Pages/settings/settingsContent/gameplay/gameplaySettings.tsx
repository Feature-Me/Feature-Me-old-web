import ChamferdButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import SettingDetails, { settingDetailsData, settingsData } from "../detailsPane/settingDetails";
import style from "../settingsContent.scss"
import KeybindSettings from "./keybindSettings/keybindSettings";

import keybindImage from "Assets/Images/keybindmap.png";
import RangeInput from "Components/RangeInput/RangeInput";
import NumberInput from "Components/numberInput/numberInput";
import HorizonalSelectFromArray from "Components/horizonalSelectFromArray/horizonalSelectFromArray";
import { values } from "lodash";

const GameplaySettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);

    const judgeTextShow = [{ label: "ON", value: true }, { label: "OFF", value: false }]
    const judgeTextDirection = [{ label: "Vertical", value: 0 }, { label: "Facing", value: -38 }, { label: "Horizonal", value: -90 }]

    const settings: settingsData = [
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.keybind.name" />,
                processingLoad: "none",
                description: <><TranslateText content="settingsPage.gameplay.keybind.description" /><img src={keybindImage} /></>
            },
            input: <KeybindSettings />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.scrollSpeed.name" />,
                processingLoad: "low",
                description: <TranslateText content="settingsPage.gameplay.scrollSpeed.description" />
            },
            input: <RangeInput min={0} max={20} step={0.1} value={gameConfig.gameplay.scrollSpeed} onChange={(value: number) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, scrollSpeed: value } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.offset.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.gameplay.offset.description" />
            },
            input: <NumberInput min={-2500} max={2500} step={1} value={gameConfig.gameplay.timing.offset} onChange={(value: number) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, timing: { ...config.gameplay.timing, offset: value } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.judgeTiming.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.gameplay.judgeTiming.description" />
            },
            input: <NumberInput min={-250} max={250} step={1} value={gameConfig.gameplay.timing.judge} onChange={(value: number) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, timing: { ...config.gameplay.timing, judge: value } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.judgeTextShow.name" />,
                processingLoad: "low",
                description: <TranslateText content="settingsPage.gameplay.judgeTextShow.description" />
            },
            input: <HorizonalSelectFromArray contents={judgeTextShow} value={judgeTextShow.find(c => c.value == gameConfig.gameplay.judgeText.show) || judgeTextShow[0]} onChange={(value) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, judgeText: { ...config.gameplay.judgeText, show: value.value } } }; })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.judgeTextPosition.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.gameplay.judgeTextPosition.description" />
            },
            input: <NumberInput min={-100} max={0} step={0.01} value={gameConfig.gameplay.judgeText.position} onChange={(value) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, judgeText: { ...config.gameplay.judgeText, position: value } } } })} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.gameplay.judgeTextDirection.name" />,
                processingLoad: "low",
                description: <TranslateText content="settingsPage.gameplay.judgeTextDirection.description" />
            },
            input: <HorizonalSelectFromArray contents={judgeTextDirection} value={judgeTextDirection.find(c => c.value == gameConfig.gameplay.judgeText.direction) || judgeTextDirection[0]} onChange={(value) => setGameConfig(config => { return { ...config, gameplay: { ...config.gameplay, judgeText: { ...config.gameplay.judgeText, direction: value.value } } }; })} />
        },

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