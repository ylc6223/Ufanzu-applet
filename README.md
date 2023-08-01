1.首页，展示最新帖子（已完成）
2.节点列表
3.热门帖子（可通过组件复用）
4.节点帖子 （可通过组件复用）
5.帖子详情 （已完成）

<pre>
├── babel.config.js             # Babel 配置
├── .eslintrc.js                # ESLint 配置
├── config                      # 编译配置目录
│   ├── dev.js                  # 开发模式配置
│   ├── index.js                # 默认配置
│   └── prod.js                 # 生产模式配置
├── package.json                # Node.js manifest
├── dist                        # 打包目录
├── project.config.json         # 小程序项目配置
├── src # 源码目录
│   ├── app.config.js           # 全局配置
│   ├── app.css                 # 全局 CSS
│   ├── app.js                  # 入口组件
│   ├── index.html              # H5 入口 HTML
│   └── pages                   # 页面组件
│       └── index
│           ├── index.config.js # 页面配置
│           ├── index.css       # 页面 CSS
│           └── index.jsx       # 页面组件，如果是 Vue 项目，此文件为 index.vue
</pre>
# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp

# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp

# npx 用户也可以使用
$ npx taro build --type weapp --watch
$ npx taro build --type weapp

# watch 同时开启压缩
$ tar # CMD
$ NODE_ENV=production taro build --type weapp --watch # Bash

小程序开发者工具
下载并打开微信开发者工具，然后选择项目根目录进行预览。

需要注意开发者工具的项目设置：

需要设置关闭 ES6 转 ES5 功能，开启可能报错
需要设置关闭上传代码时样式自动补全，开启可能报错
需要设置关闭代码压缩上传，开启可能报错
