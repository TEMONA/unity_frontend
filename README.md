# unity_frontend

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## フォルダ構成

```
root
├── assets # https://nuxtjs.org/docs/2.x/directory-structure/assets
│   ├── images # svgなどの軽量な画像を配置する（jpg,pngなどはstatic)
│   └── scss # 基盤となるSCSSを配置する（コンポーネント、ページごとのCSSはlayouts,pagesに配置する）
│       └── globals
│           ├── mixins # SCSS Mixinを用途ごとに配置する
│           └── variables # SCSS変数を用途ごとに配置する
│       └── variables.scss # Vuetify用のSCSS変数を記載する
├── components # https://nuxtjs.org/docs/2.x/directory-structure/components を[atomic design](https://a-suenami.hatenablog.com/entry/2019/04/29/173415)の思想に沿って配置する
│   ├── atoms # 最小のコンポーネント、1ファイル:1HTMLタグとなるよう配置する
│   ├── molecules # それ自体が独立して存在はできないが、Atom ほど無機質でなく、最低限の意味をそれ自体が帯びる要素になり、atomsのみを子に持つよう配置する
│   └── organisms # 独立して意味を持つコンポーネントでatomsとmoleculesを子に持つよう配置する
├── layouts # https://nuxtjs.org/docs/2.x/directory-structure/layouts
├── pages # https://nuxtjs.org/docs/2.x/get-started/routing
├── plugins # https://nuxtjs.org/docs/2.x/directory-structure/plugins
├── static # https://nuxtjs.org/docs/2.x/directory-structure/static 、重めの画像を配置する
└── store # https://nuxtjs.org/docs/2.x/directory-structure/store
└── test # jestを配置する
```

## 開発環境

### エディタ

VSCode を利用

### 拡張機能

- 必須
  - Vetur
    - Vue.js に特化したいろんな便利ツールが入ってる
  - Vue Peek
    - コンポーネントの編集を楽にする
  - Sass
    - Sass のシンタックスハイライトを入れてくれる
  - ESLint
    - コード保存時の自動検査をしてくれる
  - Stylelint
    - CSS の記述中や保存する時にいい感じにエラーを出してくれたり自動整形してくれる
  - Prettier - Code formatter
    - コードの自動整形をしてくれる
- 推奨
  - GitHub Pull Requests and Issues
    - PR 作成とかが楽になる
  - Japanese Language Pack for Visual Studio Code
    - VSCode を日本語対応させてくれる
  - Vue docs
    - Vue.js や Vuex, Vue Router, Vue SSR, Vuetify, Nuxt.js, VuePress の公式ドキュメントを VSCode 内から直接参照できる

## コーディング規約

### 命名規則

#### pages

動的ページのファイル名は\_id.vue で統一する

#### components

- アッパーキャメルケースで命名する
- 原則２つ以上の単語を連結する
  - ex. Navigation とせず、GlobalNavigation とする
  - ２つ以上の単語を利用すると不自然になる場合は、既存の HTML タグ名と競合しない名称をつける
  - HTML のタグ名と競合するのを防止するため

#### HTML クラス

BEM ベースでの命名規則を採用する
コネクタはケバブケースとスネークケースを利用し、{Block}\_\_{Element}--{Modifier}とする。

- Block
  - pages は route 名、components はファイル名を利用する
  - layouts の場合
    - ex. noauth, default
  - pages の場合
    - ex. users.vue は users, users/\_id.vue は user
  - components の場合
    - ex. GlobalNavigation, GlobalFooter
- Element
  - 役割を省略せず記載する
  - ２単語以上を利用する場合はローワーキャメルケースで接続する
  - ex. title, text, description, image, subTitle
- Modifier
  - 状態を省略せず記載する
  - 状態が複数ある場合はケバブケース１つで接続する
  - ex. disabled, type-button, type-submit

#### 画像ファイル

ローワースネークケースを利用し、{利用箇所}\_{役割}\_{要素}とする。

- 利用箇所
  - 主にファイル名を利用する
  - ex. users, user
- 役割
  - BEM でいう E を利用する
  - ex. thumbnail, icon
- 要素
  - 要素が複数ある場合はその要素名を利用する
  - １ファイル内で１つしか画像の利用箇所がない場合は省略可能
  - ex. thumbnail_kawashita, thumbnail_kaneko

### Vue

#### Components

- 型定義はそのファイル内で行う？
  - けど props は分けてた方がいいよなぁ
  - となると lists 側で型定義してた方が良い？違和感あるけどなぁ
- methods の型定義はインラインで OK
  - 他ファイルから読むことがないため

#### plugins

- props と return の型定義を書く

#### store

- props と return の型定義を書く

### SCSS

- scoped は利用しない
- 各コンポーネント内 SCSS のルートにはそのファイル名の Block を入れる
  - 他ファイルで意図しないスタイルが当たるの防止のため
- Element, Modifier 間は１行空ける
