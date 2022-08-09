import React from "react";
import style from "./settingDetails.scss";
import {match} from "ts-pattern";
import { useTranslation } from "react-i18next";

interface settingDetailsData {
    title: React.ReactNode
    processingLoad: "critical" | "high" | "medium" | "low" | "none" 
    description: React.ReactNode
}

const settingDetails: React.FC<{data:settingDetailsData}> = (props) => {
    const [translate,i18n] = useTranslation();
    const checkProcessingLoad  = (type:settingDetailsData["processingLoad"]) => {
        return match(type)
            .with("critical", () => {return{ text: "settingsPage.details.processingLoad.critical",className: style.processing_load_critical }})
            .with("high", () => {return{ text: "settingsPage.details.processingLoad.high",className: style.processing_load_high }})
            .with("medium", () => {return{ text: "settingsPage.details.processingLoad.medium",className: style.processing_load_medium }})
            .with("low", () => {return{ text: "settingsPage.details.processingLoad.low",className: style.processing_load_low }})
            .with("none", () => {return{ text: "settingsPage.details.processingLoad.none",className: style.processing_load_none }})
            .exhaustive();
    };

    const processingLoad = checkProcessingLoad(props.data.processingLoad);


    return (
        <div className={style.details}>
            <h1>{props.data.title}</h1>
            <p>
                {translate("settingsPage.details.processingLoad.name")} : <span className={processingLoad.className}>{translate(processingLoad.text)}</span>
            </p>
            <p>{props.data.description}</p>
        </div>
    )
}

export default settingDetails;
export type { settingDetailsData };