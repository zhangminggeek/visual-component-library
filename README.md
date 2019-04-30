# 宇泛前端业务组件库

## 项目介绍
该组件库包含公司部分公用组件，主要为解决公司不同项目组通用业务的统一问题，也为了节约前端各位同学的开发时间。目前该组件库仍处于开发阶段，一些业务组件会逐渐上传，大家可以积极关注，也欢迎大家上传自己开发的组件。:muscle:

## 技术栈
- 使用vue/cli 3.6.3版本脚手架搭建
- vue 2.6.10
- vue-router 3.0.3
- sass

## 目录结构
```
├── examples // 组件实例（未来考虑创建组件相关文档）
  ├── assets // 静态资源
  ├── style // 样式文件
  ├── views // 页面文件（考虑做文档主体）
  ├── App.vue
  ├── main.js // 入口文件
  └── router.js / // 路由文件
├── packages // 组件库
├── Public // 静态资源和页面（不被编译）
├── .browserslistrc // 浏览器兼容性配置文件
├── .eslintrc // slint配置文件
├── .babel.confif.js // babel配置文件
├── package.json // 相关依赖配置文件
├── postcess.config.js // css预处理器配置文件
├── README.md // 项目介绍
├── vue.config.js // 项目打包配置文件
```

## 使用方法
- 通过`npm link`方式引入（目前该项目仅支持该方式）
    1. 通过`git clone <url>`克隆该项目到本地
    2. 进入该项目所在文件夹，使用`npm link`命令将项目添加到npm管理工具中
    3. 进入需要引用该项目的项目所在文件夹，使用`npm link uniubi-base`将该项目添加到项目依赖中
    4. 打开项目入口文件通过`import UniubiBase from 'uniubi-base/packages'`导入，再使用`Vue.use(UniubiBase)`进行全局注册
    5. 也可以导入`uniubi-base/packages`目录下单一组件进行按需加载
    
- 未来可能推出其他导入方式，敬请期待...
