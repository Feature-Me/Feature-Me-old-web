import * as React from "react";
import style from './title.scss';

function Background(): JSX.Element {
    return (
        <div className={style.background}>
            <div className={style.background_blue}></div>
            <div className={style.background_green}></div>
        </div>
    )
}

export default Background;
