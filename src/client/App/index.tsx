import { REVISION } from "three";
import * as solid from "solid-js/web";
import App from "./App";

import version from "Assets/StaticInfo/version.json";

window.addEventListener("load", init);

function render() {
    solid.render(() => <App />, document.querySelector("#root")!);
}

function registerWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register("/worker", { scope: "/" })
    }
}

function init() {
    console.log(`${process.env.NODE_ENV} mode`);
    console.log("Feature Me initialized. the Game is Ready!");
    console.log("%c Hold Up! \n Please be careful when you paste anything to console.\n Attackers may steal your information. ", "color:#ffa69f;background-color:#633023;font-size:16px;");
    console.log(`%c Running Feature Me ${version.version}.Build:${0}. `, "color:#a0d6a6;background-color:#2d3c2e;font-size:16px;");
    console.log(`%c SolidJS 1.6.9 \n THREE.JS r${REVISION} `, "color:#f3c0e6;background-color:#3c2d38;font-size:16px;")
    render();
    registerWorker();
}