//inspired by https://zenn.dev/ixkaito/articles/css-image-glitch

import * as solid from "solid-js";

import style from "./glitchImage.module.scss";

interface GlitchImageProps extends solid.JSX.HTMLAttributes<HTMLDivElement> {
    src: string
}

const GlitchImage: solid.Component<GlitchImageProps> = (props) => {

    return (
        <div class={style.glitch} style={{ "background-image": `url(${props.src})` }} {...props}>
            <div class={`${style.channel} ${style.r}`}></div>
            <div class={`${style.channel} ${style.g}`}></div>
            <div class={`${style.channel} ${style.b}`}></div>
        </div>
    )
}

export default GlitchImage;