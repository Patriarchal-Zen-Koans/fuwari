---
title: 如何高效的调试 vm 模版
category: 技术
published: 2018-11-09 02:00:03
update: 2018-11-08T18:00:03.000Z
---

由于合规要求，所以文章一些名词或者数据进行了脱敏处理。

## 背景

加入阿里做的第一个项目，由于是很老的业务，前后端不分离，大部分逻辑都在后端 velocity 模版里面。

作为一个前端，我们开发时在没有后端环境的支持情况下，想要调试 vm 模版，这真的是一件极其痛苦的事情。

因为对于任何一个需求的，都需要：

1. 在后端工程里面修改 vm 代码
2. 在 aone 上部署后端工程，这一步需要大概半个小时的时间
3. 部署成功后，刷新浏览器进行验证

也就是说，任何一行代码的修改成本都至少要半个小时。而且开发时严重依赖后端同学的支持，比如我要前端显示分支流程中 A 流程，那么需要后端同学配合吐出 A 流程的数据，然后等半个小时，我要前端显示分支流程中的 B 流程，又得半个小时。如果后端同学有事情支持不了，我前端开发得暂时搁置一下了。

做了一个需求后，我发现这整个开发流程真的太痛苦了，而且效率也相当低下。一个我觉得两天就能搞定的需求，搞了整整一周，还通宵了一天才勉强赶上进度。

而且觉得阿里的技术不如想象中的那么先进，但这也是个机会，于是就想有没有什么好的解决方案。

## 方案

<!-- more -->

经过一通查找和沟通后，决定通过使用 velocityjs 在前端渲染 vm 模版，以此来解决本地开发时的 vm 调试功能。而 velocityjs 就是通过 nodejs 去解析 vm 模版， 从而得到 html 字符串。

![](/imgs/efficient-debug-the-vm-template/debugvm-1.png)

有了 velocityjs 以后就好办了，对于一个模块的调试，我们要做的就是找到 mock 数据和 vm 模版，然后渲染并返回给浏览器。

最终方案如下：

![](/imgs/efficient-debug-the-vm-template/debugvm-2.png)

## 实现

有了上面的方案，那我们实现起来也就很简单了，对于一个请求过来，处理的流程如下：

![](/imgs/efficient-debug-the-vm-template/debugvm-3.png)

1. 本地 Node 服务会跑在 3000 端口上
2. 绑定 host：127.0.0.1 xxx.alibaba.com
3. 对于一个线上商品 url:`https://wholesaler.alibaba.com/xxx/xxx.html`替换 wholesaler 为 xxx 得到:`http://xxx.alibaba.com:3000/xxx/xxx.html`
4. 本地 Node 服务拿到请求后，先去线上服务器找到这个商品的原有 html 以及用来异步渲染的模块数据 `PAGE_SCHEMA`
   > `PAGE_SCHEMA` 是具体到国际站某网站下，后端在渲染 vm 的时候会把渲染这个 vm 模块的数据同时返回给前端，挂载在全局变量 window 下面。
5. 找到本地要调试模块的 vm 模版
6. 用 Mock 数据或线上 `PAGE_SCHEMA` 的模块数据渲染 vm 模版
7. 用渲染好的 vm 模版字符串替换原有 html 对应 DOM 节点，得到重建后的 html
8. 返回重建后的 html 给浏览器，达到本地调试的目的。

最终的结果：前面的环境配好以后，比如我们要调试 `module-xxx` 这个模块 。 那么我们本地直接去修改后端工程里面的 vm 模版，然后刷新浏览器，就可以得到修改的反馈了。而且也只有这一个模块是处于调试状态，其他的模块都是线上原有的样子。

![](/imgs/efficient-debug-the-vm-template/debugvm-4.png)

这样就把一次代码的改动成本从半小时缩减到了一分钟以内，而且不需要依赖后端环境，前端就可以直接把项目跑起来，也不用老是麻烦后端同学来协助我们改数据了。

对开发体验的提升那是大大的，再也不会那么痛苦了。