---
title: 网易一年工作总结
category: 随笔
published: 2017-08-11 23:46:49
tags:
  - 总结
  - 网易
  - 杭州
---

# 做了哪些事情

说是一年，其实也一年多了，不过这倒不重要。主要看看做了哪些事吧：

## 1. 改造发布流程

刚来公司的时候，白领贷的前端是基于 Riot 框架开发的系统。语言层面，使用 ES6 和 Less 开发，发布到线上是需要一个构建打包和编译的过程，不能直接部署到线上服务器。

所以项目的开发流程就是，功能开发，提交代码，本地打包，打包后的代码跟源代码一起提交测试，而后合并代码到 master 然后再在本地打包，然后上线。

这个流程非常的不合理，因为源代码和编译打包后的代码放到一块管理，本身就不合理。经常会出现，你一打包测试，我这边代码推上去就一堆冲突。所以我就想怎么来改进这个流程。

### 改进方案一

网易内部是有一个 omad 系统（自动部署平台）的，想着说看能不能借助这个平台干点事情。因为初来乍到，对这个部署平台不是很熟悉，就问了和这个平台接触最多的测试同学，测试同学告诉我说 omad 没有提供任何对外的接口，所以我想的可能没法实现。

这样就尴尬了，没法做线上打包发布，那么打包这个过程就必然得放在本地来做。所以我就搞了一套现在看来很蠢的方案。那就是，用两个仓库来分别管理源代码和打包后的代码。

那么，如果需要发布的话，就需要在源代码仓库先进行打包编译，然后把打包编译的结果复制到管理要发布的代码的仓库。

一张示意图：

![改进方案一](/imgs/first-year-summary-for-netease-work-experience/release1.png)

很明显，上面这种方式也只是临时解决方案，需要两个仓库来管理一份代码。每次提交代码都需要额外执行一个 run build 命令。

### 改进方案二：

由于上面的方案太蠢了，所以有了改进方案二，也是我们现在一直在用的方案：那就是直接线上打包。具体如下：

<!-- more -->

本地代码开发 -> 提交 -> 推送到远端 -> omad 部署 -> omad 专用打包机执行一段脚本来进行打包编译操作 -> 把打包编译后的结果拷贝到目标机器。

一张示意图：

![改进方案二](/imgs/first-year-summary-for-netease-work-experience/release2.png)

其实，本来第一次改造就应该改成这样的。但是因为一开始对内部的部署平台 omad 并不熟悉，所以不知道 omad 部署到目标机器前还可以执行一段脚本的。以至于有了第一种非常蠢的解决方案。

现在这套方案就比较完善了， 我们只关注源代码就可以了，发布的时候又 omad 去做构建和打包部署的事情。非常舒心，这套方案也一直用到了现在。

## 2. 搭建了一套完善的开发环境

原有的白领贷开发环境是基于 express 和 webpack 配合搭建起来的，但是功能比较简陋，只支持开发和打包两个命令，而且打包的配置文件是完全服务于多页面的工程。

后来我们开发来钱系统的时候，我就在原有的基础上重新搭建了一套完善的开发环境。从开发、联调、测试、打包到上线，该有的功能都有了。放一张图，具体可以 [看这里](https://github.com/kisnows/spart)

![开发环境](/imgs/first-year-summary-for-netease-work-experience/environment.png)

## 3. 主导并推动了移动端组件 ne-rc 的开发

再开发来钱的时候，积累了一套 react 的基础组件，但是跟业务耦合度比较高。考虑到以后可能还要做其他项目，就和一伙伴一起商量着把基础组件从业务中抽离出来，作为一个第三方组件库在接入到项目中。

于是就有了: **[ne-rc](https://github.com/NE-LOAN-FED/NE-Component)**,我们的移动端组件库，索然还在为 1.0 版本的发布继续努力，但已经成功接入了三个内部的项目。

效果显著，大大降低了重复开发成本，同时也降低了未来维护的成本。由此可见，一个稳定发展的团队，还是需要一套自己的内部组件库的。

## 4. 团队工作改进

由于原有业务线前端负责人在我入职后不久就离职了， 前端技术部派我临时挑大梁。我深知自己经验不足，但也知道这是一个锻炼的机会，这里非常感谢我的老大信任我。

所以我非常努力，和业务线团队的小伙伴就如何提高我们的团队技术实力和业务支持能力讨论了很多，最后做了一下事情:

- 开发框架优化
- 遗留项目改造
- 项目规范
- 技术规划

### 开发框架优化

最终的成果就是上面说的搭建了一套完整的开发环境。并不断进行优化。从一开始白领贷项目开发时每次 rebuild 需要 30s , 打包上线需要 4~5 min 到后来去花项目 rebuild 600ms, 打包只需要 1min .这中间既有针对 webpack 的优化，也有项目开放交付方式的改变。

在这些优化的过程中，积累了很多经验。

### 遗留项目改造

有几个遗留项目，虽然整体处于维护状态，但偶尔还是有很多运营需求。而原有的开发方式和发布方式都比较麻烦，我们也尽可能在不需要多的重构的基础上，进行了逐步升级。主要是构建和发布上。
改写原有的 webpack 配置文件方式，并从本地打包发布升级到了线上打包发布。减轻了这些项目的维护成本。

### 项目规范

业务线上人员来越多，在需要合作的情况下，规范是必不可少。我们从项目文档、代码风格检查、Git 分支管理、代码 review 等各个方面制订了完善又尽可能不繁琐的规范。

### 技术规划

我们组的项目大多应用 react ，所以需要持续关注 react 生态群的技术动向。但同时也关注其他技术和解决方案，包括 Nodejs , Angular 等。前端技术部也让我们多看看 Vue . 然而到现在我都没看过 Vue ，哈哈，可能是提不起兴趣吧。

## 5. 业务支持

虽然我们前端技术部属于职能部门，但支持业务仍然是我们工作的最主要构成部分，毕竟公司要赚钱。除了一些小的以及一些后台项目，我主要参与维护和开发一下项目：

a. 白领贷项目维护
b. 来钱项目开发并上线
c. 去花项目开发并上线

去花最近就要上线了，我们已经开始内测了。这是一个提供分期的项目，目前只接入了考拉，马上也要对外了，不久大家就在考拉上购物时就可以有分期的支付选项了。

看到项目上线，还是很高兴的 😄。

# 总结

时间还是蛮快的， 都来网易一年多了。

这段时间成长了许多，无论时工作技能、沟通技能还是工作流程和规范，都让我学会了很多东西。

也认识了很多优秀的同事，能跟这些优秀的同事一起做事情，也是一件很开心的事情。也许以后不会一直在网易，但在网易的这段经历还是很值得的。