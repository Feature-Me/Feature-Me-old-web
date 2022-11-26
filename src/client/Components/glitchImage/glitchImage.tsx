//inspired by https://zenn.dev/ixkaito/articles/css-image-glitch

import React from "react";

import style from "./glitchImage.scss";

interface GlitchImageProps extends React.DOMAttributes<HTMLDivElement> {
    src: string
}

const GlitchImage: React.FC<GlitchImageProps> = (props) => {

    return (
        <div className={style.glitch} style={{ backgroundImage: `url(${props.src})` }} {...props}>
            <div className={`${style.channel} ${style.r}`}></div>
            <div className={`${style.channel} ${style.g}`}></div>
            <div className={`${style.channel} ${style.b}`}></div>
        </div>
    )
}

export default GlitchImage;