import gameData from "dataController/gameData/gameData";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import sleep from "../timer/sleep";

async function switchPage(page:string,animationFlag:boolean = true) {
    if(!gameData.page.allPages[page]||!gameData.page.container) throw new Error("Page is not defined");
    if(animationFlag) {
        gameData.sceneChangerOpened.setter(false)
        await sleep(500)
    }

    const container = gameData.page.container;
    const Current = gameData.page.allPages[page];
    if (gameData.page.root) gameData.page.root.unmount();
    gameData.page.root = createRoot(container.current);
    gameData.page.root.render(
        <React.StrictMode>
            <RecoilRoot>
                <Current />
            </RecoilRoot>
        </React.StrictMode>
    );
    
    gameData.sceneChangerOpened.setter(true)
}

export default switchPage;