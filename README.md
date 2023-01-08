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
│       ├── foundations # リセットCSS,汎用クラスのSCSSを用途ごとに配置する
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
