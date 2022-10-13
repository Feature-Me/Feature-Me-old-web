import React, { HTMLAttributes } from "react";

import style from "./card.scss";

interface cardPropsType extends HTMLAttributes<HTMLDivElement> {
    radius?: number | "none" | "round"
    color?: string
}

const Card: React.FC<cardPropsType> = (props) => {
    const cardInnerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (!cardInnerRef.current) return;
        if (props.color) cardInnerRef.current.style.background = props.color;
        if (props.radius) {
            const raduis = props.radius == "round" ? 8 : props.radius == "none" ? 0 : props.radius;
            cardInnerRef.current.style.borderRadius = `${raduis}px`;
        }
    }, [])

    return (
        <div className={style.card}>
            <div className={`${style.inner} ${props.className}`} {...props} ref={cardInnerRef}>
                {props.children}
            </div>
        </div>
    )
}

export default Card;