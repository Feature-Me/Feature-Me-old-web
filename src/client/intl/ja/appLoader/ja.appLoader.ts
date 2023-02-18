import JAAppLoaderAudioTranslation from "./ja.appLoaderAudio";
import JAAppLoaderStorageTranslation from "./ja.appLoaderStorage";
import JAAppLoaderWebSocketTranslation from "./ja.appLoaderWebsocket";

const JAAppLoaderTranslation = {
    "cancel": "中止",
    "ok": "OK",
    "retry": "再試行",
    "report": "問題を報告",
    "offline": "オフラインプレイ",
    "failed": {
        "title": "読み込みに失敗",
        "description": "ゲームの読み込みに失敗しました。"
    },
    "done": "準備完了",
    "ready": "読み込みが完了しました。間もなく開始します...",
    "storage": JAAppLoaderStorageTranslation,
    "websocket": JAAppLoaderWebSocketTranslation,
    "audio": JAAppLoaderAudioTranslation
}

export default JAAppLoaderTranslation;
