
当我要组织文章内容的时候，我感到十分的吃力。

这是源于一个困惑：我们现在是否还需要探讨什么是`Promise `？

我们很容易就能 “使用” `Promise `，已经有很多优秀的模块实现了不同标准的`Promise `。
而随着ES6原生 `Promise `的落实，我们更容易写出 `Promise `风格的异步代码。

```javascript
// ES6 下的原生Promise
var httpGet = (url) =&gt; {
  return new Promise( (resolved,rejected)=&gt;{
    request.get(url,(err,res)=&gt;{
      if(!err){
        resolved(res);
      }else{
        rejected(err);
      }
    });
  });
}

httpGet('http://abc.com').then(...);
```

但是，治学这东西，知其然，还要知其所以然。

尤其是现在很多声音还存在对 `Promise `的曲解的情况下。
### 那么，Promise到底是什么东西？
有一种说法是用了`Promise `就不需要callback的写法了，实际上是不是这样，我们看一段代码

```javascript
func(arg ,(err,ret)=&gt;{
  //pass
});

func(arg).then( (err,ret)=&gt;{
  //pass
});
```

实际上只是callback写的位置不一样而已，并没有什么实际的改变。

**是不是这样呢?我们层层深入地理解一下 Promise 到底是什么。** 

对于上面这个问题， `Promise `是不是只是把callback换个地方写呢？

我从《深入浅出Nodejs》 4.3.2 中的一段话收到了启发

> 
上面的异步调用中，必须严谨地设置目标。那么是否有一种先执行异步调用，延迟传递处理的方式呢？

说的就是传统的callback写法，必须在异步调用的时候，明确地声明回调处理的逻辑。

```javascript
httpGet('/api',{
  success:onSuccess,
  error:onError
});
```

就是说，你必须明确指明了异步调用结束时的各种回调，然后才会执行异步操作

```javascript
（声明异步操作）---&gt; (注册回调) ---&gt; (执行异步操作)
```

反过来看看 `Promise `是不是就不一样呢？先看一段代码

```javascript
var p = httpGet('/api');

p.then(onSuccess , onError);
```

你猜到底在哪一步发起了http请求？

正如你猜测的一样，在 `p`初始化的时候，这个异步操作就执行了。
所以对于`Promise `来说，流程是这样的

```javascript
（声明异步操作）---&gt; (执行异步操作) ---&gt; (注册回调)
```

&gt;原来真的存在一种方法，先执行异步调用，延迟传递处理的方式。这就是`Promise `与传统callback一个很显著的区别。
### 状态机
如果 `Promise `只是对callback在逻辑顺序及书写方式上面的一点改动的话，

那你就小看它了。

有没有想过，为什么 `Promise `能先执行异步操作，再指明回调逻辑呢？下面这段代码又会如何？

```javascript
var p = httpGet('/api');

// do something

p.then(onSuccess , onError);

// do something

p.then(onSuccess , onError);
```

请问，第二个`then`是否正常执行 ？
#### Promise  下的状态
`Promise `定义了其内部的几个状态

- pending
- resolved (fullfilled)
- rejected 

`Promise `初始化后 内部状态为 `pending`，然后开始执行异步操作，
当异步操作完成，内部状态转换为 `resolved`或 `rejected`(失败时)。

一旦状态改变，就会被固化，不会再改变。

所以就很好解释，一个状态已经确定的 `Promise `,无论你调动多少次`then`，它都会返回正确且唯一的结果，因为 `Promise `的结果，是完全依赖它自己的内部状态。
#### 这个时候我们有必要说一下`then`方法到底做了什么？
不去深入探究的话，你大概会认为`then`只是注册了一系列回调函数。

其实 `then`除了注册回调函数，还会检查 `Promise `状态，只要不是`pending`状态，就回调用相应状态的回调。

同样的，当状态改变的时候，也会检查对应状态是否有已经绑定的回调函数，再按照`Promise `的方式去执行回调。

正因为这种机制，才能真正实现了`Promise `的异步操作与回调声明分离，并且通过维护状态变化，更好地控制异步操作结果中的不同情况。

> 
注：为了降低理解成本，本文的实现里一个状态默认只处理一个回调函数

### 一字长蛇阵
以上便是一个独立的 `Promise`的运行机理，在这之上灵活运用才是`Promise`的终极玩法。

那么我们经常听到的用 `Promise`解决回调地狱，是怎么回事呢？看看最终代码：

```javascript
loadPic('/path/of/picture.jpg')
  .then(...) //图片压缩
  .then(...) //生成缩略图
  .then(...); //存储到指定地方
```

想想用`callback`的时候你是怎么写的。

它的原理就是，每个`then`的 resolved 部分，返回一个新的 `Promise`，
这么一来就能继续 `then`下去，只要每一个环节都遵守`Promise`规范，就能将一个回调地狱梳理成**串行** 的**链式调用** 。
#### 最后附上两种手写 `Promise`的参考

> 
http://www.lanhao.name/article/293

(未完)
