import { atom,selector } from "recoil";

import version from "../../Config/versions.json";

const settingsWindowAtomState = atom({
    key: "settingsWindowAtom",
    default: false,
});

const environment = JSON.parse(localStorage.getItem("environment") || "{}");
const termsWindowAtomState = atom({
    key: "termsWindowAtom",
    default: (!environment.termsAccepted || environment.termsVersion != version.TermsVersion)
});


export { settingsWindowAtomState, termsWindowAtomState };