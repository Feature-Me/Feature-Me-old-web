//inspired by https://zenn.dev/ixkaito/articles/css-image-glitch

import React from "react";

import style from "./glitchImage.scss";

const GlitchImage: React.FC<{background:string}> = (props) => {
    
    return(
        <div className={style.glitch} style={{backgroundImage:`url(${props.background})`}}>
            <div className={`${style.channel} ${style.r}`}></div>
            <div className={`${style.channel} ${style.g}`}></div>
            <div className={`${style.channel} ${style.b}`}></div>
        </div>
    )
}

export default GlitchImage;