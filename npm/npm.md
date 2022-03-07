# npm

## 1.注册方式

```
1. 官网注册 (按指示步骤注册即可，反正我没成功)
 https://www.npmjs.com/signup
 
2. cmd命令行注册
```

## 2.命令行注册账号

```
* 使用npm adduser
```

### 2.1npm源没有指向npm.js

- 报错类型

![1642579012(1)](./1642579012(1).jpg)

- 解决方案

  ```
  * 全局安装 nrm
  	npm install nrm -g
  
  * 查看当前npm源
  	nrm ls
  
  * 切换源到npm.js
  	nrm use npm
  ```

  ![1642579395(1)](./1642579395(1).jpg)



### 2.2注册账号超时

- 报错类型

![1642579654(1)](./1642579654(1).jpg)



- 解决方案

  ```
  * 原因： 
  	初步判断： npm官网发送验证到我们指定邮箱的时间太久，甚至已经超过了有效期
  	最终确定： npm虽然的响应时间确实很久，但是请不要多次发送，窗口也不要关闭，一次发送对应一次验证就能注册成功
  
  * 解决方案：
  	(本人： 19分发送的验证码，37分收到)
  	npm虽然的响应时间确实很久，但是请不要多次发送，窗口也不要关闭，一次发送对应一次验证就能注册成功
  ```

  ![1642581678(1)](./1642581678(1).jpg)



## 3.npm登录

```
* npm login
输入 账户名、密码、邮箱、邮箱验证码即可
```

## 4.npm上传

### 4.1配置package.json文件

```
{
  "name": "包名",  // 包名，不要和npm已有的包名重合即可， 后续安装npm install 包名
  "version": "1.0.1",  // 默认是1.0.0  记得每次最后版本上传时要修改版本号，因为版本号一样，npm install的时候有旧包的开发者可能会直接使用旧包
  "description": "",  // 项目描述
  "main": "xxx/index.js",  // 项目的入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "package": "npm version patch && npm publish"  // npm run package  包版本自动迭代和包上传结合
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "css-loader": "^6.5.1",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "uuidjs": "^4.2.9"
  },
  "devDependencies": {
    "@babel/core": "^7.16.7",
    "@babel/plugin-proposal-class-properties": "^7.16.7",
    "@babel/preset-env": "^7.16.8",
    "babel-loader": "^8.2.3",
    "webpack": "^5.66.0",
    "webpack-cli": "^4.9.1"
  }
}

```

### 4.2配置需要上传那些文件

- -配置黑名单

```
* 在根目录下创建 .npmignore文件

* 配置.npmignore文件，让上传的时候忽略一些文件

eg. 
 	.*
	node_modules/
	WinRenderCore/
	package-lock.json
	package.json
	webpack.config.js
	
```

- 配置白名单

```
* 在package.json中配置files字段，指定那些文件需要上传，会和.npmgnore做差集

  "files": [
    "/lib"   // 例如黑名单中有test.*， 白名单中/lib,最终上传/lib/index.* 而不会上传 /lib/test.*
  ]
  
```

- 官方关于文件忽略的一些补充说明

链接：  [关于一些特殊文件不需要忽略说明](https://docs.npmjs.com/cli/v8/using-npm/developers)

![1642660916(1)](./1642660916(1).jpg)

- 跟网友的聊天记录

![1642661119(1)](./1642661119(1).jpg)



### 4.3上传npm包

```
* 直接上传 （记得去package.json中修改包的版本 --- version）
 npm publish

* 或者使用上面package.json中我们的自定义脚本package
 npm run package
```

## 5.私有库的创建

### 5.1私有库的作用

```
* npm私有库只针对公司内部局域网开放，不对外部公开，具有一定的保密性
* 速度比在直接在npm下载更快，甚至是比淘宝源更快。因为毕竟是在公司局域网
* 对于发布和下载npm包配置权限管理
* 私有库能够将包资源进行缓存，响应的话会加快下载速度
* 搭建npm私有库算作对团队的一个技术亮点
```

### 5.2Verdaccio

- 概念

```
* 官网
  Verdaccio 是一个 Node.js创建的轻量的私有npm proxy registry 
  
* [某掘金网友理解](https://juejin.cn/post/6951029290616455176)
 就是在你本地或者是团队内部网络中搭建一套内部的 npm 仓库。npm 仓库可以做什么， Verdaccio 提供的私有仓库就能做什么。
```

- 安装Verdaccio

```
npm install --global verdaccio
```

- 修改配置文件

```
* verdaccio配置文件默认位置在c:\users\当前用户\AppData\Roaming\verdaccio下

* 修改config.yarm

#设置NPM包的存放目录
storage:./storage
 
#设置用户验证的文件。
auth:
  htpasswd:
  file: ./htpasswd
 
#修改监听的端口 不配置这个只能本机访问(记得写在log下，写在其他地方无效)
listen: 0.0.0.0:4873
```

- 启动Verdaccio

  - 直接启动

  ```
  * verdaccio
  ```

  - 通过pm2启动（个人启动是瞬间关闭的，所以我是使用直接启动）

  ```
  * 先安装pm2
   npm install -g pm2
   
  * pm2启动Verdaccio
   pm2 start verdaccio
  ```

  - 默认启动web服务端口4873

  ```
  * 浏览器打开web页面，根据页面提示操作
   http://localhost:4873
  ```

- 上传包到这个私有库

```
npm publish --registry http://localhost:4873/
```

- 下载私有包

```
npm install your-package --registry  http://localhost:4873/
```











