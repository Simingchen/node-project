Windows 平台使用如下命令：
```
npm start         其中node-project为你的项目名称
```
然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。
修改的文件ctrl + s已经实时监听，刷新即可
安装mongooes时会附带mongdb一并安装
nodemon npm start 自动监听修改并启动服务器

# Express 应用生成器安装自建express项目

1，安装express生成器：
```
npm install express-generator -g
```

2，创建一个命名为 myapp 的应用。
```
express myapp
```

3，然后安装所有依赖包：
```
cd myapp 
npm install
```
4, 启动：
npm start


然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了
