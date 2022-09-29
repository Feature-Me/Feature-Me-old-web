import React from "react";
import style from './displayDirectionCaution.scss';
import { BsPhone } from 'react-icons/bs';
import TranslateText from "Components/TranslateText/TranslateText";

const DisplayDirectionCaution: React.FC = () => {
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
                <h1><TranslateText content="cautions.displayDirection" /></h1>
                <BsPhone className={style.caution_phone_icon} />
            </div>
        </div>
    )
}

export default DisplayDirectionCaution;