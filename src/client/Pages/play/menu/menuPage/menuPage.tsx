import React from "react";
import { useTranslation } from "react-i18next";

import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

import Header from "Block/head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";
import { useSetRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";

import style from "./menuPage.scss";
import TranslateText from "Components/TranslateText/TranslateText";

const MenuPage: React.FC = () => {
    const [translation, i18n] = useTranslation();
    const sceneChangeNavigation = useSeneChangeNavigation();
    const useSetGameConfig = useSetRecoilState(gameConfigState);

    const menu: menuContentsArray = [
        { content: "menu.solo", to: "../solo/select" },
        { content: "menu.multi", to: "../multi" },
        { content: "menu.practice", to: "../practice" },
        { content: "menu.story", to: "../story" },
        { content: "menu.collection", to: "../collection" },
        { content: "menu.settings", to: "../settings" },
        { content: "menu.about", to: "../about" },
        { content: "menu.viewbg", to: "../background" }
    ]

    React.useEffect(() => {
        const config = JSON.parse(localStorage.getItem("gameConfig") || "{}");
        useSetGameConfig(config);

        document.title = `Menu - Feature Me`;
    }, []);

    return (
        <div className={style.menupage}>
            <Header title="Home" backFunc={() => sceneChangeNavigation("/title")} />
            <div className={style.menu}>
                {
                    menu.map((menu, index) => {
                        const direction = index % 2 == 0 ? "left" : "right";
                        return (
                            <LinkWrapper to={menu.to} key={index}>
                                <div className={style[direction]}>
                                    <TranslateText content={menu.content} />
                                </div>
                            </LinkWrapper>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MenuPage;