import React from "react";
import style from './cautionScreen.scss';
import { BsPhone } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const CautionScreen: React.FC<{children:JSX.Element}> = (props) => {
    return (
        <div className={style.caution_screen}>
            {props.children}
        </div>
    )
}

export default CautionScreen
