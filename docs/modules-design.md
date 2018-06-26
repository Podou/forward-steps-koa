## Modules design

对于一个轮子项目，需要根据不同的需求添加模块和减少模块，所以有一个独立的模块处理成为必须的。

添加文件夹`server/modules`,用来存放不同的模块，以user模块为例，起目录结构为：

```
/server/modules/
  +-- user/
    +-- index.js        路由的设置
    +-- controllers.js  controller设计
    +-- services.js     不同功能的服务设计
```

如果对于user下面有多个cotrollers文件或者多个services文件，可以创建文件夹，但必须包含index.js文件，起目录结构为：

```
/server/modules/
  +-- user/
    +-- index.js        路由的设置
    +-- controllers/    controller设计
      +-- index.js
      +-- controller1.js
      +-- controller2.js
      +--  ...
    +-- services/       不同功能的服务设计
      +-- index.js
      +-- service1.js
      +-- service2.js
      +--  ...
```

### 通配加载modules和路由

在`server/modules/index.js`中，使用`文件读取 + require`的方式，加载各个modules下面的路由。

在`server/routes/index.js`中，实现加载`modules`后，循环添加路由信息。

这样在不修改`modules`以外的任何代码，就能实现添加新的`路由`和`实现`。
