# Unity frontend

このリポジトリは、兼子さん発案のもと開発が進んでいる社内SNS「Unity」のフロントエンド用リポジトリです。
社内SNSは、社員の検索やランチケーションの申請ができるテモナ社員限定のWEBサービスです。

## 各種バージョン

node以外はpackage.json参照。大まかには、nuxt3+vuetify3の構成。
パッケージ管理はyarnを利用。

- node.js: v20.10.0
- yarn: 1.22.17

正直nuxtを選んだ理由は特にない、書きやすいから選んだ程度。

## インフラ

Netlifyというサービスに全部お任せ。社内で使うレベルのものなら無料。
bot@temona.co.jpでアカウント登録をしている。
この子は賢いので、stageとproductionがマージされたら自動で各環境にデプロイされるようになっている。

- stage: https://unity-frontend-stage.netlify.app/
- production: https://unity.temona.co.jp/

デプロイ時に勝手にコマンド叩いてyarn run generateしているので、静的ファイルとして動作している。

## ディレクトリ構成

コンポーネントはアトミックデザインチックな考えで分割。それ以外は基本nuxtのルールに合わせる。
そんなに大きなプログラムではないので、componentsの割り方は結構ノリ。

- assets
  - scssとか書きたい時はここに入れる。だが基本CSSはcomponents/pages/layouts単位で記載するので、あまり使うことはない
  - svgを使う場合などもここに入れることを想定しているが、アイコンはmdiを使っているので基本使うことはない
- components
  - atoms
    - UIを構成する最小単位。Vuetifyを使ってるので基本定義することはないが、タイトルとテキストは用意されてなかったりするので独自で作ってる
  - molecules
    - 単体で１つの機能を持ち、意味が理解できる最小限のUI。ここではリストの１要素（行）とかをmoleculesとして定義している
  - organisms
    - 単体で複数の機能を持つ、あるいは特定の機能において単体で完結しているUI。検索結果とか
- composables
  - 独自に定義できるプラグインのようなもの。nuxt3は賢いので定義したものは自動で読み込まれる
- pages
  - 文字通り、ページ。ここで定義したものがそのままルーティングになる。基本的にcomponentsを呼び出しページごとのハードコーディングはなるべく抑えて実装する
- layouts
  - グローバルナビゲーションなどの複数ページで常に表示されるページのラッパーのようなもの。
- middleware
  - サーバーサイド・クライアントサイド共、ルーティング（ページ遷移）にあたって行う共通処理。
- plguins
  - nuxt内で利用したいプラグイン。nuxt3は賢いので定義したものは自動で読み込まれる
- public
  - staticなもの（画像とか）をおく場所
- server
  - サーバーサイドでAPIを立てたい時などに使うが、そんなことはないので基本使い道はない
- store
  - stateを管理する場所。機能ごとにファイルを切り出す。nuxt3からは状態管理ツールがpiniaになってる点に注意
- types
  - 独自の型定義を追加したい場合に入れる場所。

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn run dev
```

## Production

stg, prdで動作見たい時は各ブランチにマージすべし。
