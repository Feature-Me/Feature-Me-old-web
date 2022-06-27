import gameData from "dataController/gameData/gameData";
import React from "react";
import { createRoot } from "react-dom/client";

function switchPage(page:string,animationFlag:boolean = true) {
    
    if(!gameData.page.allPages[page]||!gameData.page.container) throw new Error("Page is not defined");
    if(animationFlag) gameData.sceneChangerOpened.setter(false);
    const container = gameData.page.container;
    const Current = gameData.page.allPages[page];
    if (gameData.page.root) gameData.page.root.unmount();
    gameData.page.root = createRoot(container.current);
    gameData.page.root.render(<Current />);
    setTimeout(() => gameData.sceneChangerOpened.setter(true), 500);
}

export default switchPage;