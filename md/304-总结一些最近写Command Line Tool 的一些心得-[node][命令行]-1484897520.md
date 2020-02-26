

> 
总结一些最近写Command Line Tool 的一些心得

## yargs
```javascript
npm install yargs --save
```

`yargs`是优雅地接受命令行输入参数的模块，功能非常强大且易用，免去了很多重复的工作，一段代码足以证明：

```javascript
const argv = require('yargs').argv; 

// argv 会自动接受所有输入参数 ，比如 demo_command -a hello

console.log(argv.a);  
//hello
```

当然可以对 `a`做更多的配置 

```javascript
const yargs = require('yargs');

let argv = yargs.
		options('a', {
		    alias: 'api',
		    default: 'all',
		  }).argv;
//这样可以给 argv.a设置一个默认值，同时有一个别名，如：demo --api hello
```

更多的配置方式看[github](https://github.com/yargs/yargs)
## colors
```javascript
npm install colors --save
```

`colors`是用来控制命令行输出文本颜色的, 还有更多功能如 `背景色`、`字体特效`等我用得比较少，需要学全的请看[github](https://github.com/Marak/colors.js)。

```javascript
//用起来也是特别简单，
const colors = require('colors');

//输出绿色的hello , 黄色的 world
console.log(colors.green('hello ') + colors.yellow('world'));
```

更多预设颜色：black、red、green、yellow、blue、magenta、cyan、white、gray、grey

主要是用于命令行输出提示信息，如红色的`error message`
## readline-sync
```javascript
npm install readline-sync --save
```

`readline-sync`是同步获取用户输入的模块，主要用于带交互的基本输入。

常见的有询问用户是否同意 ，同意输入`yes`, 或者需要用户填写什么信息之类。

```javascript
const readline = require('readline-sync');

let name = readline.question('What is your name? ', {defaultInput: 'Tom'});

console.log('Oh! I got it! You are '+name);
```

输出：

```javascript
$ node test.js 
What is your name? Gay  
Oh! I got it! You are Gay
```

`readline-sync`的功能远远不止这样，还有很多交互方式，详情看[github](https://github.com/anseki/readline-sync)
## 关于目录的一些问题#### HOME
`HOME`目录在Command Line 中也比较常用，可以让你生成一些本地文件，或者配置文件。
`Linux`和 `OSX`中，可以通过环境变量来获取。

```javascript
process.env['HOME'];
//  当前用户的目录
```

而`windows`的话，我就没研究了。
#### 命令所在的源码目录
```javascript
__dirname

当前执行的脚本的目录，不管你在哪个目录下调用，这个返回的都是源码所在目录
```

这个指的是你当前命令的执行文件源码的目录（或理解为 `安装目录`）。

它的作用是，你可能需要从你开发的命令的源码里加载一些文件，或者模板。

比如 一些框架的脚手架 ，需要生产代码 ，自然就是从脚手架的目录里copy一份模板。
#### 当前目录
```javascript
process.cwd()
```

这个是指你输入命令的当前目录。

**要活用以上两个目录，在写 Command Line Tool 的时候会经常用到。** 
### 注意 EOL 的坑
```javascript
require('os').EOL
```

这是一个很方便的功能，它会抹平操作系统的差异性，返回一个换行符。
在你打印信息的时候十分常用。

**不过注意有一个坑** 

如果你需要生产一些文本文件，那你需要特别注意里面用的换行符。

比如我在`linux`下生成的配置文件，弄到 `windows`下就解释不出来了。
