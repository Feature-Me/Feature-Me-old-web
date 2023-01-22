import solid from "solid-js";
import { render } from "solid-js/web";
import App from "./App";

window.addEventListener("load", init);

function init() {
    render(() => <App />, document.querySelector("#root")!);
}