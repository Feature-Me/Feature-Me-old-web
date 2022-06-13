import React from "react";
import style from './directionCaution.scss';
import { BsPhone } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import CautionScreen from "../cautionScreen/cautionScreen";

const DisplayDirectionCaution: React.FC = () => {
    const [translation, i18n] = useTranslation();

    return (
        <CautionScreen>
            <div className={style.display_direction_caution}>
                <h1>{translation("cautions.displayDirectionCaution")}</h1>
                <BsPhone className={style.caution_phone_icon} />
            </div>
        </CautionScreen>
    )
}

export default DisplayDirectionCaution;
