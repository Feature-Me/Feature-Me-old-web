import ChamferdTextInput from "Components/textInput/chamferedTextInput/chamferedTextInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import { gameConfig } from "Utils/LocalStorage/initLocalStorage";

import style from "./keybindSettings.scss";

const KeybindSettings: React.FC = () => {
    const [translate, i18n] = useTranslation();
    const [gameConfig, setGameConfig] = useRecoilState<gameConfig>(gameConfigState);

    function setKeybind(index: number, key: string) {
        setGameConfig(config => {
            return {
                ...config,
                gameplay: {
                    ...config.gameplay,
                    key: {
                        ...config.gameplay.key,
                        [index]: key
                    }
                }
            }
        });
    }

    return (
        <div className={style.keylist}>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(0,e.code) }}>Key1 : {gameConfig.gameplay.key[0]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(1,e.code) }}>Key2 : {gameConfig.gameplay.key[1]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(2,e.code) }}>Key3 : {gameConfig.gameplay.key[2]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(3,e.code) }}>Key4 : {gameConfig.gameplay.key[3]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(4,e.code) }}>Center : {gameConfig.gameplay.key[4]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(5,e.code) }}>L Key : {gameConfig.gameplay.key[5]}</span>
                <span tabIndex={-1} onKeyDown={(e) => { setKeybind(6,e.code) }}>R Key : {gameConfig.gameplay.key[6]}</span>
                </div>

    )
}

export default KeybindSettings;