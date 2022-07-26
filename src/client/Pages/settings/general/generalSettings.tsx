import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

const GeneralSettings: React.FC = () => {
    const [translate,i18n] = useTranslation();
    
    return(
        <div>
            <h1>General Settings</h1>

        </div>
    )
}