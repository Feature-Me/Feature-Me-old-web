import React from "react";
import style from './directionCaution.scss';
import { BsPhone } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import CautionScreen from "../cautionScreen/cautionScreen";

const DisplayDirectionCaution: React.FC = () => {
    const [translation, i18n] = useTranslation();
    const displayDirectionCautionRef = React.useRef<HTMLDivElement>();
    const [isDirectionLandscape, setIsDirectionLandscape] = React.useState(true);

    React.useEffect(() => {
        if (isDirectionLandscape) displayDirectionCautionRef.current.parentElement.style.display = "none";
        else displayDirectionCautionRef.current.parentElement.style.display = "block";
    },[isDirectionLandscape]);

        window.addEventListener("resize",()=>{
            if (window.innerWidth > window.innerHeight) setIsDirectionLandscape(true);
            else setIsDirectionLandscape(false);
        })


    return (
        <CautionScreen >
            <div className={style.display_direction_caution} ref={displayDirectionCautionRef}>
                <h1>{translation("cautions.displayDirection")}</h1>
                <BsPhone className={style.caution_phone_icon} />
            </div>
        </CautionScreen>
    )
}

export default DisplayDirectionCaution;
