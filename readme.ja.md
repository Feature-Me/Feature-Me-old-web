# Feature Me (日本語)

### 音ゲーマーが贈る,音ゲーの新しい形。

# 注意
## ライセンスについて
当ゲームのライセンスはオープンで自由に改変/再配布可能なオープンソースのMozilla Public Licenseです。

ソースの開示,著作権表記や同一ライセンスの条件の下,商用利用や変更,再配布は認めますが,作者は責任を負いません。

また,商標の使用(ここではFeature Meのタイトル)の使用を禁じます。著作権表記の中ではタイトルを使用して下さい。

また,楽曲やイラスト等のリソースについては,商用利用を認めません。

# パッチノート

## 00065-beta(Version 0.5.7)
Commit A:

一部Utilsのディレクトリ変更

TermsWindowとSettingsWindowのディレクトリ変更

Commit B:

フォント追加

コード整形

LinkWrapperコンポーネント更新

## 00064-beta(Version 0.5.7)
設定画面の英語サポートの拡充

## 00063-beta(Version 0.5.6)
ヘッダーフォント(Julius Sans One)→タイトル専用フォントに変更
ヘッダータイトルをNoto Sans JP Blackに変更
各部のフォントの調整
ルーティングの調整
チャートエディター画面追加
選曲画面で楽曲が表示されない不具合を修正

## 00062-beta(Version 0.5.6)
ゲームロジックの変更

+ 判定表示の計算方法が変更。
+ 精度判定を実装。

**この実装により,ゲームの処理が重たくなる可能性があります。**

## 00061-beta(Version 0.5.6)
Commit A:

Stateファイルのディレクトリ変更

CSS調整

ファイル移動に伴う変更など

newProjectRouter newProjectコンポーネントを廃止。Utilsへ移動。

Utilsのリネーム

選曲画面での楽曲の長さを表示するロジックを変更

コード整形

Commit B:
コード整形
Typesの更新

## 00060-beta(Version 0.5.6)
Utilsの変更

一部Utilsの微調整と削除

楽曲リソースの微調整

## 00059-beta(Version 0.5.6)
Commit A:

設定画面のディレクトリ変更

MusicGameをMusicGame3dに変更

Commit B:

設定画面の説明が開業されるように変更

NumberInputコンポーネント追加

判定調整設定追加

スタイル調整と一部アイコン等の変更

アンチエイリアスが動作するようになりました


## 00058-beta(Version 0.5.6)
Commit A:

誤字修正

スタイルの調整

SelectBoxの型の変更

タイトルが動的に更新されるように変更

Commit B:

チャート変換の追加

エディタの変更
 
Ace Editorの追加

## 00057-beta(Version 0.5.6)
Commit A:

アニメーションに関するコードのフォーマット

Commit B:

TranslateTextコンポーネントの修正

メニューのリファクタリング

クイックメニューにタイトルへ戻るを追加

ファイルの移動

Commit C:

翻訳の更新

Commit D:

スタイルのリファクタリング

画面遷移などの特定の条件下でゲームの描画処理が正常に破棄されずにそのまま実行され続ける問題を修正

## 00056-beta(Version 0.5.6)
Commit A:

タグのリネーム

Commit B:

クイック メニューの追加

クイックメニュー内にチャットを実装

WebSocketの対応

サーバーの更新

Commit C:

エディターのルーティングを追加

スタイルの調整 

## 00055-beta(Version 0.5.6)
Commit A~F:

デプロイの不具合を解消したサーバー緊急アップデート。

## 00054-beta(Version 0.5.6)
git attributesの入力エラーを修正

## 00053-beta(Version 0.5.5)
Music Roomで再生が可能になりました。

開発時にDisocrd Botは起動しなくなります。(開発時にのみ影響)

## 00052-beta(Version 0.5.5)
カラーの変数とスタイリング規則を変更

## 00051-beta(Version 0.5.5)
dist更新。(使用中のバージョンによっては競合によりアップデートリソースをインストールできない場合があります)

リソースフェッチの分岐削除

データベースの初期化を常時実行するように変更

## 00050-beta(Version 0.5.4)
Music Room追加

## 00049-beta(Version 0.5.4)
SCSS 変数の更新

## 00048-beta(Version 0.5.3)
SCSS インポートの更新

タイトル画面テキストをChart EditorからEditorへ変更

## 00047-beta(Version 0.5.3)
フォルダ構造の変更

discord API追加

Discord-Feature Me間の相互連携の実装を目標に開発を進めます。

## 00046-beta(Version 0.5.3)
ファイルのリネーム
 
入力コンポーネントの改善

## 00045-beta(Version 0.5.2)

Feature Me GUI Collections の作成 [Github Link](https://github.com/Feature-Me/Feature-Me-GUI)

Readme.ja.md(本ファイル)の若干の修正

ChamferedButtonをCollections用から移植したものへ更新

高さの小さい端末での設定画面をスクロール可能に


## 00044-beta(Version 0.5.2)

INPUTコンポーネントの枠線を白に統一

起動時のデバッグ表示

水平セレクタ コンポーネントの追加

範囲入力のUI調整

ゲームのアンチエイリアスに関する項目を追加

3D背景の設定を追加

## 00043-beta(Version 0.5.1)

UIの調整,ゲーム進捗バーに点の追加

リザルトにスコア,Chain,ランク欄を追加

モバイル版のヘッドバーのサイズを48pxへ(PC版と統一)

## 00042-beta(Version 0.5.1)

リザルト画面ベース追加

UIのバグ修正

キャラクター移動エフェクトの調整

フレームレート設定の調整精度を細分化

ルーター設定の更新

ステートの型の調整

## 00041-beta(Version 0.5.1)
翻訳の更新

音量設定,グラフィックス設定追加

## 00040-beta(Version 0.5)
Google Search Consoleの設定

## 00039-beta(Version 0.5)
Google Analyticsの更新

## 00038-beta(Version 0.5)
リソースの調整とリバート

## 00037-beta(Version 0.5)
ビルドの更新

## 00036-beta(Version 0.5)
dist リソース更新。

PWA マニフェスト追加

一部の譜面を無効化

サーバー更新。

ファビコン適用

## 00035-beta(Version 0.5)
ファイルの再ビルド,軽量化

## 00034-beta(Version 0.5)
サーバーの微調整

## 00033-beta(Version 0.5)
**SBT/OBT前最終コミット**

dist更新

誤字修正

判定の追加

ゲームのプレイが可能になりました。

データベースの修正

型データの修正

## 00032-beta(Version 0.5)
Commit A:

package.jsonの更新

インポート更新

Webpack設定の更新,TS-loaderからbabel-loaderへ

譜面コンバーターの仮実装

リソースのファイルマップとチャートのパーサーをJSON5へ変更。

Utilsの関連の軽微な変更,stats.jsとレンダリングステータスクラスを追加。

タップ音の追加

Commit B:

インポート更新

SCSSの修正

ゲーム画面の大幅なロジック更新,タイトルを独立コンポーネントへ

ゲーム用実装のFeaturesディレクトリ追加。

ゲーム関連の型,状態等の修正

楽曲セレクタの修正

Commit C:
dist更新

リソース更新

言語ファイルの修正

設定画面の変更

ゲーム関係の修正に伴うリレーの変更

## 00031-beta(Version 0.5)

インポートの整理

SCSSミックスインの変更

## 00030-beta(Version 0.5)
Commit A:

リソース更新。

削除：getExtension モジュール(path.extnameを使用)

データベース構成の変更

型定義ファイルのディレクトリ変更

ライブラリの調整

リソースローダーの追加などのUtils関連の変更

Commit B:

ルーターの更新

設定画面の追加

音楽ゲーム本編画面の追加

Utilsディレクトリ内の変更
+ データベース初期化の変更
+ イージング関数の追加
+ アップデーターの変更
+ ローカルストレージ初期化の変更
+ チャートパーサーの追加
+ ノーツクラスの追加
  
ステート管理の変更

distの更新

## 00029-beta(Version 0.5)

一部においてSCSSのコード整理

webpackの設定を変更

## 00028-beta(Version 0.5)

大規模な改修を実施。

旧バージョンをブランチ development-old に移動。

プログラムの大幅なリファクタリング

メニュー項目 プラクティス 追加。

設定画面 ベースの追加。

React routerの採用。

変数/ステート管理の更新。


## 00026-alpha
軽度の調整。

# このゲームについて
