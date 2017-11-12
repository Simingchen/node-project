# vue-mall a project with vue + vum

> An UI Framework build with Vue.js

***vum is update to vue@2.0! checkout to `v0.1.1` for vue@1.x.***

## What is?

vue-mobile is an UI Framework build with Vue.js for SPA:

- Full Page Structure - header, content, footer
- Page transition support by vue-router
- Bunch of Powerful Components, easy to use and extend
- high performance CSS3 Animation
- 1px border for all components - as well as round border
- Write with Vue - the most important

## Love Vue

Vue is the best View Layer Framework I have ever seen:

- Elegant API
- Two way binding, Components
- Easy to build large scale App
- Wonderful Components Organization.

## Progress

- [x] Page
- [x] Buttons
- [x] Column
- [x] Grid
- [x] List
- [ ] Cards
- [x] Contacts
- [x] Form
- [x] Icons

- [x] Modal
- [x] Preloader
- [x] Tab
- [x] Scroll
- [x] Popup
- [x] Actions
- [x] Toast
- [x] Search Bar
- [x] Calendar
- [ ] Photo Browser
- [x] Swiper

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Get Start

Two way to create a project with vum?

### clone source code directly

1. Clone this repo to your work dir
2. `npm install` to install dependences
3. `npm run dev` to run dev server with hot reload.
4. Open `http://localhost:8088` in your browser, then you can see the demos
5. Change to dir `src/demos`, modify what you want, and remove unused pages

That's all! You can do it :) Do not forget to reinit git.


### use npm

1. Create your project, [vue-cli](https://github.com/vuejs/vue-cli) is recommend
2. `npm install vum` in the root of your project
3. Import the components you wanted in `src`


And vui-mobile could never be completed without these:

- [Vue](http://vuejs.org/)
- [vue-router](http://router.vuejs.org/en/basic.html)
- [Less](http://lesscss.org/)
- [Webpack](https://webpack.github.io/)

# Stay In Touch

Please make sure that you have some knowledge about vue.js


├── README.md                       项目介绍
├── index.html                      入口页面
├── build                           构建脚本目录
│   ├── build-server.js                 运行本地构建服务器，可以访问构建后的页面
│   ├── build.js                        生产环境构建脚本
│   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│   ├── dev-server.js                   运行本地开发服务器
│   ├── utils.js                        构建相关工具方法
│   ├── webpack.base.conf.js            wabpack基础配置
│   ├── webpack.dev.conf.js             wabpack开发环境配置
│   └── webpack.prod.conf.js            wabpack生产环境配置
├── config                          项目配置
│   ├── dev.env.js                      开发环境变量
│   ├── index.js                        项目配置文件
│   ├── prod.env.js                     生产环境变量
│   └── test.env.js                     测试环境变量
├── mock                            mock数据目录
│   └── hello.js
├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                             源码目录
│   ├── main.js                         入口js文件
│   ├── app.vue                         根组件
│   ├── components                      公共组件目录
│   │   └── title.vue
│   ├── assets                          资源目录，这里的资源会被wabpack构建
│   │   └── images
│   │       └── logo.png
│   ├── routes                          前端路由
│   │   └── index.js
│   ├── store                           应用级数据（state）
│   │   └── index.js
│   └── views                           页面目录
│       ├── hello.vue
│       └── notfound.vue
├── static                          纯静态资源，不会被wabpack构建。
└── test                            测试文件目录（unit&e2e）
    └── unit                            单元测试
        ├── index.js                        入口脚本
        ├── karma.conf.js                   karma配置文件
        └── specs                           单测case目录
            └── Hello.spec.js


