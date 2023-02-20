import JATitleTranslation from "./title/ja.title";
import JATermsTranslation from "./others/ja.terms";
import JAResourcesManagerTranslation from "./others/ja.resourcesmanager";
import JACacheController from "./others/ja.cacheController";
import JACautions from "./others/ja.cautions";
import JAMenuTranslation from "./play/ja.menu";
import JAHeadTranslation from "./components/ja.head";
import JAMusicSelectTranslation from "./play/ja.musicselect";
import JASettingsPage from "./settings/ja.settingspage";
import JAEditorTranslation from "./editor/ja.editor";
import JASplashScreenTranslation from "./others/ja.splashScreen";
import JAMultiPlayerTranslation from "./play/multiPlayer/ja.multiplayer";
import JACrashHandlerTranslation from "./others/ja.crashHandler";
import JAAppLoaderTranslation from "./appLoader/ja.appLoader";
import JASetupTranslation from "./setup/ja.setup";

const JAtranslation = {
    title: JATitleTranslation,
    terms: JATermsTranslation,
    resourcesManager: JAResourcesManagerTranslation,
    cacheController: JACacheController,
    cautions: JACautions,
    menu: JAMenuTranslation,
    head: JAHeadTranslation,
    musicSelect: JAMusicSelectTranslation,
    settingsPage: JASettingsPage,
    editor: JAEditorTranslation,
    splashScreen: JASplashScreenTranslation,
    multiPlay: JAMultiPlayerTranslation,
    crashHandler: JACrashHandlerTranslation,
    appLoader: JAAppLoaderTranslation,
    setup: JASetupTranslation
}

export default JAtranslation;