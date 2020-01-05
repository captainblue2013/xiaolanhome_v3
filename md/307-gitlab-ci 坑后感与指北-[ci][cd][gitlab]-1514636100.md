

> 
本文的目的:

最主要是备忘, 其次是分享

疗效:

并不能让你一下子掌握CI/CD, 这只是一个比较完整的解决方案,其他基础知识,自行补充.

#### 基调

> 
首先,这不是屠龙刀,不要奢望一篇文章可以走遍天下.这里只是提供一个具体的落地方案, 一个具体的技术选型.

#### 阶段1: 代码仓库
关于 **代码仓库** , 本文选取的方案是 `gitlab`

`gitlab`的搭建:

以目前的情况来说, 推荐使用`docker`来搭建你的系统, 不然你会陷入各种膜明其妙的问题.

> 
docker的知识, 请自行补充一下,篇幅有限不能展开细说.

在这里我推荐一个:

`https://hub.docker.com/r/sameersbn/gitlab/`

打开以后直接搜索`Quick Start`, 按照`docker-compose`的方式启动你的`gitlab`. 

> 
不要对英文心存恐惧 ---- 孔子

下载好  `docker-compose.yml`之后不要急着启动, 需要修改几个参数:

> 
需要学习一点点yml的知识, 大约5分钟, 自行google

- `GITLAB_SECRETS_DB_KEY_BASE`, 
- `GITLAB_SECRETS_SECRET_KEY_BASE`, 
- `GITLAB_SECRETS_OTP_KEY_BASE`

上面三个是`gitlab`用于加密时用的key, 随便给个长度64的字符串, 这块不做 深究.

- `GITLAB_ROOT_EMAIL`
- `GITLAB_ROOT_PASSWORD`

上面两个就是初始化时管理员账号的`账号密码`, 按自己的需要填写

- `GITLAB_HOST`

这是 **gitlab** 内部使用的地址, 这关系到你gitlab页面上的项目地址,没设置的话, 到时候显示的是`127.0.0.1`, 这个鬼才能`clone`下来.

> 
这个 host 一旦设置, 初始化完就改不了了, 所以一定要在第一次启动之前 就设置好.

#### 启动
`docker-compose up`

一系列的初始化信息以后, 你就能访问你的gitlab了.

默认是  `http://{你的IP}:10080`

`其他关于gitlab的使用技巧, 就不深入了.
能关注这篇文章的都不是萌新了,这些内容自己补充吧.
`
#### 阶段2: 提交触发
接上文.

`gitlab-ci`在最新版的`gitlab`已经是内置的了, 只要项目里有`.gitlab-ci.yml`,同时有对应的`gitlab-runner`, 就能实现`CI`, 相比之下不需要太多的配置.

> 
名词解释:

.gitlab-ci.yml:

这是gitlab-ci使用的任务描述文件, 里面主要是定义CI的过程需要执行哪些行为, 简单说就是, 要进行哪几个步骤, 每个步骤是哪些命令.

gitlab-runner:

另一个程序, 也可以用docker启动, 就是负责执行 CI 任务的机器人, runner这块后面会展开讲.

**启动并注册`gitlab-runner`** 

我们还是使用`docker`来启动,这是一个大方向

```javascript
docker run -d --name gitlab-runner --restart always \

-v /srv/gitlab-runner/config:/etc/gitlab-runner \

-v /var/run/docker.sock:/var/run/docker.sock \

gitlab/gitlab-runner:latest
```

> 
想深入了解的话, 请看 

https://docs.gitlab.com/runner/install/docker.html

**敲黑板!!** 

在这里, 我们将宿主机的`docker.sock`映射进去,让`runner`可以跟宿主用同一个`daemon`, (意味着你进去runner内部执行`docker images`是可以看到外面的镜像列表的), 这样做是埋下一个**伏笔** , 以便后面阶段使用`dind`(docker in docker)时, 获得更好的体验.

**继续** 

好了, 这个时候你启动了一个`runner`, 你要告诉它应该到哪里去"服役",

这一步叫做: **注册** 

> 
注册runner的方式请看 

https://docs.gitlab.com/runner/register/index.html#docker

不过, 还是请你使用以下命令来注册:

```javascript
docker exec -it gitlab-runner gitlab-runner register \

--docker-volumes /var/run/docker.sock:/var/run/docker.sock \

--docker-privileged
```

这里使用了两个参数, 都是为了 **docker in docker** 能得到更好的体验而服务的.

输入以上命令后, 根据提示填写信息, 其中:

- host,token 这些, 请打开你刚装好的gitlab, 进入 `Admin area`-`Runners `,然后照着填写就是了
- 特别注意期间会让你选一个`executor `类型, 个人推荐最好的方式是`docker `, 至于`shell`这种方式, 玩玩可以,实际使用时副作用太多.
- 更多参数的细节, 自行研究.

完成以上步骤之后, 你在`gitlab`- `Admin area`-`Runners `页面就能看到注册好的`runner`了, 当然你现在还是感觉不到它的作用.

```javascript
这个环节内容比较多, 操作比较多, 走到这里建议休息一下喝杯茶.
```
#### 阶段3: Runner Job
这个阶段, 是指代码提交以后, `gitlab-runner`会自动读取项目的`.gitlab-ci.yml`, 运行里面定义的每个`Job`.

这里给出一个极简的`.gitlab-ci.yml`例子,

它做的就是, 在提交代码以后, 自动的**测试** , 自动的**构建** , 自动的**发布** :

```javascript
stages:
  - test
  - build
  - deploy

job_01:
  stage: test
  image: dev_tool/node_builder:1.0.0
  script: 
   - npm install --registry=https://registry.npm.taobao.org
   - node server.js &amp;
   - node test_api.js

job_02:
  stage: build
  image: gitlab/dind
  script:
  - docker build -t ci-demo:latest .

job_03:
  stage: deploy
  image: dev_tool/rancher-cli:latest
  script:
  - rancher-tool init
  - rancher up -d  --pull --force-upgrade --confirm-upgrade
```

一目了然, 上面的第一个定义: `stages`数组,

意思是这个项目的`CI/CD`过程要执行三个步骤(`stage`),

分别是`test测试`-`build编译`-`deploy发布`

然后下面的三个`job_*`,名字是随意的, 重点是里面的`stage`属性,

告诉`gitlab-ci`这个任务是在哪个`stage`执行的,

一个`stage`你可以写很多个`job`

**敲黑板!!!** 

需要注意的是, 我们之前选择了`docker executor`, `job`里面就要声明`image`属性,指定这个`Job`的`scripts`要在哪个`image`里面运行.

**重点说明!! 再次大力敲黑板!!** 

这里第二步使用了`gitlab/dind`, 仔细看`script`, 这是在一个容器里面去构建一个镜像, 为了**整体体验** 与**构建效率** 着想, 我们之前注册`runner`的时候,将宿主机的`docker.sock`映射进去是十分必要的!!
(重新翻上去看吧)

**看到这里, 聪明的朋友已经发现了,** 

我们需要自己**打造** 一批用于运行`Job`的基础镜像, 这些镜像里要预先安装好我们需要的依赖环境.

举个栗子:

你要在`build`这一步做`webpack`打包的话, 你要准备好一个内部安装好`webpack`的镜像(相关的`node`,`npm`之类就更不用说了)

**听起来好麻烦?** 

也不是, 这是个 **功在当代,利在千秋** 的行为, 前期打造好基础镜像, 后面的项目就可以很容易写`CI Job`了.

> 
更多 gitlab-ci.yml 的高级写法,还是建议看官方文档
https://docs.gitlab.com/ee/ci/yaml/README.html

#### 阶段4: 坐享其成 &amp;&amp; 总结
如果按照上面的步骤把这个系统搭建起来以后, 你应该已经能够感受到`gitlab-ci`带来的好处了.

现在你只管提交代码, 就能快速看到新功能集成到相应的环境了.

此后, 你只要写好每一步的`Job`就可以了.

尤其是**测试** 这个环节.

尤其是**测试** 这个环节. 

尤其是**测试** 这个环节.
### 后记
- `gitlab`真的很吃资源, 虚拟机玩够呛, 团队用的话, 建议装一台PC来搭建.
- `基础镜像`别偷懒, 多打磨,让你的`scripts`可以更简洁
- 更进一步的话, 自己开发一系列的命令行工具, 让你的`scripts`更强大. 
- 有事找我, 包教会.

