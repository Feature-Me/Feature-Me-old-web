import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import SettingDetails, { settingDetailsData } from "../detailsPane/settingDetails";

import style from "../settingsContent.scss"

const GeneralSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState(gameConfigState);
    const [settingDetailsData, setiSettingDetailsData] = React.useState<settingDetailsData>({ title: "", processingLoad: "none", description: "" });
    const settingListRef = React.useRef<HTMLDivElement>(null);
    const selectLanguageOptions = [
        { value: "en_us", label: "English(EN-US)" },
        { value: "en_uk", label: "English(EN-UK)" },
        { value: "ja", label: "日本語(JA-JP)" },
        { value: "zh_cn", label: "简体中文(ZH-CN)" },
    ];

    const settings: Array<{ details: settingDetailsData, input: React.ReactNode }> = [
        {
            details: {
                title: <TranslateText content="settingsPage.general.language.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.general.language.description" />
            },
            input: <SelectBox contents={selectLanguageOptions} onChange={(value: { value: string, label: string }) => { i18n.changeLanguage(value.value) }} value={selectLanguageOptions.find(e => e.value == i18n.language)!} />
        },
        {
            details: {
                title: <TranslateText content="settingsPage.general.benchmark.name" />,
                processingLoad: "medium",
                description: <TranslateText content="settingsPage.general.benchmark.description" />
            },
            input: <ChamferedButton>{translate("settingsPage.general.benchmark.button")}</ChamferedButton>
        }, {
            details: {
                title: <TranslateText content="settingsPage.general.terms.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.general.terms.description" />
            },
            input: <ChamferedButton>{translate("settingsPage.general.terms.button")}</ChamferedButton>
        },
        {
            details: {
                title: <TranslateText content="settingsPage.general.credit.name" />,
                processingLoad: "none",
                description: <TranslateText content="settingsPage.general.credit.description" />
            },
            input: <></>
        }
    ]


    return (
        <div className={style.settings_content_wrapper}>
            <h1>{translate("settingsPage.general.title")}</h1>
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

export default GeneralSettings;