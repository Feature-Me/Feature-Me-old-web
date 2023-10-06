/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';

import Version from "Global/Assets/Version.json";

import App from './App/App';

window.addEventListener("load", init);

function init() {

    console.log(`${import.meta.env.MODE} mode`);
    console.log("%c Feature Me initialized. the Game is Ready!","font-size:20px;background-color:#1189da;border-radius:4px;");
    console.log("%c Hold Up! \n Please be careful when you paste anything to console.\n Attackers may steal your information. ", "font-size:20px;color:#ffa69f;background-color:#633023;border-radius:4px;");
    console.log(`%c Running Feature Me ${Version.version}.Build:${Version.build}. `, "font-size:20px;color:#a0d6a6;background-color:#2d3c2e;border-radius:4px;");

    const root = document.getElementById('root');

    render(() => <App />, root!);
}
