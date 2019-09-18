## 这是基于node中express框架的服务器 + vue2.0前台客服端双并的一个应用

### server层
express + mongooes + mlab(500M free database on netline)

### client层
vue + vum (微信开源UI框架)，pc由hbs渲染，移动端由apiList接口自定义

### Windows 平台使用如下命令：

1,在server下
```
npm start      (ps: nodemon npm start 自动监听修改并启动服务器,但须安装nodemon)
```
然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个服务器开启的首页应用了。
nodemon npm start运行修改的文件ctrl + s已经实时监听，刷新即可

2,在client下
```
npm run dev  
```
浏览器中打开 http://localhost:8085/ 即可看到前台客户端
这是vue下使用express请求的数据
