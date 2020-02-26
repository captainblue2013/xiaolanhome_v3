

> 
内容来自 [npm官方文档](https://docs.npmjs.com/files/package.json), 本文做中文解释.

### name, version
首先, 包名字是**必须的** . 版本号也是**必须的** .

**npm** 规定了, 一个**package** 是由**名字** 加**版本号** 作为唯一标识的.

比如 `express@4.2.0`, `koa@2.1.1`, 不同的包名或者版本号, 对应的内容是不一样的.

以上内容比较好理解, 接下来我补充几点: 

- 包名必须少于等于 **214** 字符, 
- 包名不能以 `.`或`_`开头
- 包名不能含有大写字母 (历史原因, 有的老包还有大写字母,新的已经不能用大写字母)
- 另外, 一些`URL`规范里不允许的字符也不能用(具体哪些字符就需要大家自己查查了)
- 建议不要在包名里包含`js``node`等字眼, 因为**npm** 默认就是**js** 或**node** 的
- 因为包名最终会用在`require`语句里, 所以尽可能短一些,但要注意能明确表达自己的用途
- 你开发一个包之前, 最好自己上 [npm官网](https://www.npmjs.com/)看看名字是不是已经被占用了(很重要)

对于版本号, **npm** 使用业界标准的 `{major}.{feature}.{patch}`模式

所以 `1.4.1`到`1.4.2`可能是修复个小bug

`1.4.1`到`1.5.0`可能是加了新功能

`1.4.1`到`2.0.0`的话, 可能就是变化很大的两个东西了.

> 
Tips

如果你要发布包到**npm** , 相同的包名, 相同的版本号, 只能发布一次,

所以如果你修改了代码, 需要更新版本号才能**publish** ,

具体修改哪一位, 要看你修改了多少东西.

### description, keywords
这两个放在一起讲.

这两个字段都是用来在**npm官网** 上搜索的, 区别是一个是字符串, 一个是字符串数组.

不难理解, **npm** 会对`description`做分词搜索, 而对于 `keywords`会做精准搜索.

> 
Tips

官方并未说明, 以上关于分词与否, 纯属猜测.

### homepage
如果你有时间, 可以为你的包做一个官网之类的, 大型的项目常见.
### bugs
这个字段并不是说这个包还有 **bug** , 首先我们看看例子 

```javascript
{ 
	"url" : "https://github.com/owner/project/issues",
	"email" : "project@hostname.com"
}
```

这个字段其实是提供给使用者上报 **bugs** 的途径, 可以填一个**email** 或者一个**issue地址** 

> 
Tips

如果你只想提供一个**issue地址** , 那么**bugs** 可以只是一个字符串

### license
这个......不想多说, 自行了解吧
### author, contributors
这是关于作者或者其他开发人员信息的字段, 含义很好理解, 我们看一个例子:

```javascript
{ 
	"name" : "Barney Rubble", 
	"email" : "b@rubble.com", 
	"url" : "http://barnyrubble.tumblr.com/"
}
```

**author** 和**contributors** 就是放置型如上面这样的对象来描述人物信息的, 区别是, **author** 是单个, 而**contributors** 是数组.

> 
Tips

非必须信息, 可以出名以后再加.

### files
这个不是必选项, 也并不常见, 但是很重要, 因为有配置这个信息会显得非常专业.

**files** 是一个数组, 它描述了你 `npm publish`的时候推送到**npm** 服务器的文件列表,支持目录和通配 比如

```javascript
"files": [
    "LICENSE",
    "History.md",
    "Readme.md",
    "index.js",
    "lib/"
  ],
```

反过来, 你可以通过一个 `.npmignore`文件来排除一些文件, 防止大量的垃圾文件推送到**npm** , 规则上和你用的`gitignore`是一样的.

> 
Tips

如果你的项目下有 **.gitignore** 文件, 那么它也能充当**.npmignore** 的功能.

这意味着, 如果没有特别的需求, 一个**.gitignore** 就行了.

### main
这个是一个重要属性,原文对这个描述比较绕, 实际上可以理解为 **入口文件** 

```javascript
"main":"./src/index.js",
```

以上面的例子来说, 如果你的包名是`foo`, 当用户代码`require('foo')`时,

相当于**require** 了你包目录下的 `./src/index.js`文件.

如果没有提供这个字段, 默认是项目根目录下的`index.js`
### bin
这也是一个重要属性, 它定义了一系列可执行命令, 在全局安装的命令行包里尤其多见.

这里提供一个**pm2** 的`bin`例子:

```javascript
"bin": {
	"pm2": "./bin/pm2",
	"pm2-dev": "./bin/pm2-dev",
	"pm2-docker": "./bin/pm2-docker",
	"pm2-runtime": "./bin/pm2-runtime"
},
```

上面这个对象的意思是, 安装完以后, 输入`pm2`实际上是运行`{模块所在目录}/bin/pm2`, 以此类推.

带有`bin`信息的包, 在局部安装后, 可执行文件会在`./node_modules/.bin`下,

如果是全局安装, 可执行文件会在 `$PATH`里对应`npm`那个目录下.

> 
Tips

有些朋友安装node环境的方式比较奇怪, 没有把全局安装nodule的路径加到 $PATH里,

导致 npm install -g 以后提示命令找不到, 最好检查一下自己的$PATH

### man
这里是`manuel`, 是**手册** 的意思, 不是男人, 也不是上面说到的**main** 

这个是指定一个(或多个)文件, 用于执行`man {包名}`时, 展现给用户的手册内容.

稍微有点**linux** 基础都懂, 不细说.
### directories
这个字段挺无语的, 它是一个**object** , 包含了`lib``bin``man``doc``example``test`等属性, 

主要是用来告诉用户我的某些功能目录放在哪里, 也是一个**显得专业** 的功能.

除此以外暂时没有实际应用.

```javascript
"directories": {
	"bin": "./bin",
	"doc": "./doc",
	"lib": "./lib",
	"man": "./man"
},
```
### repository
这个属性很明显, 是放置你的`git`地址的, 格式如下:

```javascript
"repository" :{ 
	"type" : "git", 
	"url" : "https://github.com/npm/npm.git"
},
```

> 
Tips

这个部分有一些缩写的方式, 自己看原文吧.

### scripts
这个是重点!

```javascript
"scripts": {
    "start": "node app.js",
    "any": "any command &amp;&amp; exit 0",
},
```

以上两个配置, 提供了 `npm start`和`npm run any`两个命令对应的实际操作.

至于什么时候需要`run`什么时候不需要, 

可以详细看 [npm scripts](https://docs.npmjs.com/misc/scripts), 这个够单独开一章来说明.

> 
Tips 

除了定义一些快捷命令, scripts 还有一些钩子性质的预定义命令,

如 preinstall , postinstall 可以在包安装前后 **自动** 执行一些操作

详细还是看上面的链接.

### config
这是一个`object`结构, 定义了一些执行`scripts`时的配置参数之类, 和`scripts`属性关系很大, 个人目前还没用过, 等我研究好了再补充.

目前可以参考 [npm-config](https://docs.npmjs.com/misc/config)
### dependencies, devDependencies, peerDependencies
前两个大家很熟悉了, 不用展开讲了, 唯一需要提醒的是, 要自己判断什么包安装在**dev** 就行.

值得注意的是 **peerDependencies** 这个并不常见的属性, 

它是用于你这个包并不依赖模块**A** , 但是要使用你这个包, 必须当前项目装了**A** .

比如你的 `my-project`, 已经引入了`people`模块, 而还有一个`people-fly`, 必须你的`my-project`有用到`people`才可以用, 但是`people-fly`的源码里并没有直接使用`people`.

这时候, `people-fly`的**package.json** 里就会声明`peerDependencies`包含`people `

以上这一段多读几次应该能理解的.
### bundledDependencies
这个是一个特定场景的属性, 我个人没用过.

**bundledDependencies** 是一个字符串数组, 内容只能是在**dependencies, devDependencies** 两个里面声明过的包才行.

这样可以在`npm publish`和`npm pack`的时候将一些依赖打包进去.

> 
Tips:

单纯声明在dependencies里的包, 会在安装的时候, 再从npm那边安装一遍.

而打包了的, 就会在当前模块安装的时候, 就一并下载下来了.

具体怎么应用就自己想想吧, 我没用过.

### optionalDependencies
可有可无的依赖?

npm通常会在某些依赖安装失败时报错, 中断操作, 而写在**optionalDependencies** 的依赖则不会.

要妥善支持这个功能, 你的源码里面也要注意判断这些特定的依赖是否存在.

其实是很麻烦很扯淡的操作.
### engines
```javascript
"engines" : { 
	"node" : "&gt;=0.10.3 &lt;0.12" 
}
```

这个属性可以声明你的包需要在怎样的`node`环境下运行 (`npm`也一样可以声明)

只不过,

只有在用户配置 **npm** 的`engine-strict`后, 才会有意义, 不然只会冒出一个 `warning`(程序员看不到 `warning`)
### engineStrict
忽略, 最新的 `npm`已经废弃这个了.
### os
看两个例子

```javascript
"os" : [ "darwin", "linux" ]
```

.

```javascript
"os" : [ "!win32" ]
```

显然意见就是操作系统的黑白名单, 

比如你开发了一个工具, 只支持**OSX** , 不支持**Windows** (这合情合理!)

就可以通过这个来声明.
### cpu
看两个例子

```javascript
"cpu" : [ "x64", "ia32" ]
```

.

```javascript
"cpu" : [ "!arm", "!mips" ]
```

不想解释了, 能玩到这个属性的人, 已经不需要看这个了.
### private
这个设置为`true`, 就会无法`npm publish`,

怎么说呢, 有用的吧.
