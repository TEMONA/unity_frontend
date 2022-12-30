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
│   ├── images # svgなどの軽量な画像を配置する（jpg,pngなどはstatic
│   └── scss # 基盤となるSCSSを配置する（コンポーネント、ページごとのCSSは別で配置）
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
