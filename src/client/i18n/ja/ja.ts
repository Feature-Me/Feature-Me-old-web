import JATitleTranslation from "./title/ja.title";
import JATermsTranslation from "./components/ja.terms";
import JAResourcesManagerTranslation from "./others/ja.resourcesmanager";
import JACacheController from "./others/ja.cachecontroller";
import JACautions from "./others/ja.cautions";
import JAMenuTranslation from "./play/ja.menu";
import JAHeadTranslation from "./components/ja.head";
import JAMusicSelectTranslation from "./play/ja.musicselect";
import JASettingsPage from "./settings/ja.settingspage";
import JAEditorTranslation from "./editor/ja.editor";

const JAtranslation = {
    title: JATitleTranslation,
    terms: JATermsTranslation,
    resourcesManager: JAResourcesManagerTranslation,
    cacheController : JACacheController,
    cautions: JACautions,
    menu: JAMenuTranslation,
    head: JAHeadTranslation,
    musicSelect: JAMusicSelectTranslation,
    settingsPage: JASettingsPage,
    editor:JAEditorTranslation,
}

export default JAtranslation;