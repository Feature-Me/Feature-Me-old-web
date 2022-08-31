import React from "react";
import style from './displayDirectionCaution.scss';
import { BsPhone } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const DisplayDirectionCaution: React.FC = () => {
    const [translation, i18n] = useTranslation();
    const displayDirectionCautionRef = React.useRef<HTMLDivElement>(null);
    const [isDirectionLandscape, setIsDirectionLandscape] = React.useState(true);

    React.useEffect(() => {
        if(!displayDirectionCautionRef.current) return;
        if (isDirectionLandscape) displayDirectionCautionRef.current.style.display = "none";
        else displayDirectionCautionRef.current.style.display = "block";

        checkDirection();

        window.addEventListener("resize", checkDirection);
        return () => {
            window.removeEventListener("resize", checkDirection);
        }
    }, [isDirectionLandscape]);

    function checkDirection(){
        if (window.innerWidth > window.innerHeight) setIsDirectionLandscape(true);
        else setIsDirectionLandscape(false);
    }

    return (
        <div className={style.caution_screen} ref={displayDirectionCautionRef}>
            <div className={style.display_direction_caution}>
                <h1>{translation("cautions.displayDirection")}</h1>
                <BsPhone className={style.caution_phone_icon} />
            </div>
        </div>
    )
}

export default DisplayDirectionCaution;