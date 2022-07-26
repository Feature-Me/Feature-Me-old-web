import React from "react";
import { useTranslation } from "react-i18next";

import style from "./menuPage.scss";

import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

import Head from "Block/Head/head";
import LinkWrapper from "Components/linkWrapper/linkWrapper";


const MenuPage:React.FC = () => {
    const [translation, i18n] = useTranslation();
    const sceneChangeNavigation = useSeneChangeNavigation();
    
    return (
        <div className={style.menupage}>
            <Head title="Home" backFunc={() => sceneChangeNavigation("/")}/>
            <div className={style.menu}>
                    <LinkWrapper to="../solo/select" >
                        <div className={style.left}>
                            {translation("menu.solo")}
                        </div>
                    </LinkWrapper>
                    <div className={style.right}>
                        {translation("menu.multi")}
                    </div>
                    <div className={style.left}>
                        {translation("menu.practice")}
                    </div>
                    <div className={style.right}>
                        {translation("menu.story")}
                        
                    </div>
                    <div className={style.left}>
                        {translation("menu.collection")}
                    </div>
                    <LinkWrapper to="../settings">
                    <div className={style.right}>
                        {translation("menu.settings")}
                    </div>
                    </LinkWrapper>
                    <div className={style.left}>
                        {translation("menu.about")}
                    </div>
                    <div className={style.right}>
                        {translation("menu.viewbg")}
                    </div>
            </div>
        </div>
    );
}

export default MenuPage;