import React from "react";
import style from './title.scss';
import {BsPhone} from 'react-icons/bs';
import {useTranslation} from 'react-i18next';



const DisplayDirectionCaution: React.FC = () => {
    const [translation, i18n] = useTranslation();
    return (
        <div className={style.display_direction_caution}>
            <h1>{translation("title.displayDirectionCaution")}</h1>
            <BsPhone className={style.caution_phone_icon}/>
        </div>
        )
}

export default DisplayDirectionCaution;