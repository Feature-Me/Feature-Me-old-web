const JASettingsPage = {
    "general": {
        "title": "総合",
        "language": {
            "name": "言語",
            "description": "言語を選択してください。"
        },
        "benchmark": {
            "name": "ベンチマーク",
            "description": "ベンチマークを実行してデバイスに合った設定のためのヒントを提案します。",
            "button": "実行"
        },
        "terms": {
            "name": "利用規約",
            "description": "利用規約を表示します。",
            "button": "表示"
        },
        "credit": {
            "name": "クレジット",
            "description": "クレジット\n プログラム : Mksk \n 書き下ろし楽曲 : Rae/Goners \n イラストレーション : てぬ",
        }
    },
    "gameplay": {
        "title": "ゲームプレイ",
        "keybind": {
            "name": "キーバインド",
            "description": "ゲームの操作に使用するキーを設定します。",
        },
        "liveVisualization":{
            "name":"ライブビジュアライゼーション",
            "description":"プレイ中の精度/予測表示を有効にします。",
        },
        "scrollSpeed":{
            "name":"スクロールスピード",
            "description":"ゲームのスクロールスピードを設定します",
        },
        "offset":{
            "name":"オフセット調整",
            "description":"音楽に対するノートの位置を調整します。\nFuture(Fast)が多い場合は-に,Past(Late)が多い場合は+に調整してください。"
        },
        "judgeTiming":{
            "name":"判定タイミング調整",
            "description":"ノートの判定のずれを調整します。\nFuture(Fast)が多い場合は-に,Past(Late)が多い場合は+に調整してください。"
        }
    },
    "graphics": {
        "title": "グラフィックス",
        "gameResolution":{
            "name":"ゲーム3D解像度",
            "description":"ゲームの3Dレンダリング品質を設定します。"
        },
        "gameAntiAliasing":{
            "name":"ゲームアンチエイリアス",
            "description":"ゲームのアンチエイリアスを設定します。\n推奨:System"
        },
        "gameAASampling":{
            "name":"ゲームアンチエイリアスサンプリング",
            "description":"ゲームのアンチエイリアス(SSAAまたはTAA)使用時のサンプリング倍率を設定します。"
        },
        "gameRenderType":{
            "name":"ゲームレンダリングタイプ",
            "description":"ゲームのレンダリング方法を選択します。"
        },
        "gameFps":{
            "name": "ゲーム最大フレームレート",
            "description":"ゲームの最大フレームレートを設定します。\nこの設定は判定精度に影響します。"
        },
        "backgroundRenderType":{
            "name": "背景レンダリングタイプ",
            "description": "背景のレンダリング方法を選択します。"
        },
        "backgroundResolution":{
            "name":"背景3D解像度",
            "description":"3D背景使用中のレンダリング品質を設定します。"
        },
        "backgroundFps":{
            "name": "背景フレームレート",
            "description": "3D背景使用中の最大フレームレートを設定します。"
        },
        "autoFullScreen":{
            "name": "自動フルスクリーン",
            "description": "ゲーム本編開始時に自動的にフルスクリーンにします。"
        }
    },
    "audio": {
        "title": "オーディオ",
        "masterVolume":{
            "name":"マスター音量",
            "description":"ゲームの総合音量を設定します。"
        },
        "musicVolume":{
            "name":"楽曲音量",
            "description":"楽曲と選曲プレビューの音量を設定します。"
        },
        "effectVolume": {
            "name": "エフェクト音量",
            "description": "判定音とアシストサウンドの音量を設定します。"
        }
    },
    "storage": {
        "title": "ストレージ",
    },
    "details":{
        "processingLoad": {
            "name": "負荷",
            "critical": "最高",
            "high": "高",
            "medium": "中",
            "low": "低",
            "none": "無",
        }
    },
}

export default JASettingsPage;