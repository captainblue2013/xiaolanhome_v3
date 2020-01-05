

> 
江湖上流传着一个说法，说是通过 yield 和 generator ，就是用同步的方式写出异步的代码。

真的是这样吗？

也许你可以从网上搜到很多相关教程，照着样例代码，你也能写出这样的代码。但是你是否真的已经明白，这背后到底发生了什么？

### 第一集，他是谁？
这就是一个 `generator`，

```javascript
var gen = function* (){
	return 1;
}
```

看上去像个函数，浑身有一种莫名其妙的的罪恶感，对了，他让我想起那恶心的指针。

我们看看运行起来会怎么样？

```javascript
gen();
// {}
```

看来只是长得像，跟函数没啥关系呢。

我想他还有其他不为人知的地方，比如，`next()`

```javascript
var a = gen();
console.log( a.next() );

// { value: 1, done: true }   duang！！
```

我明白了，要调用`next`才能让他执行起来。
### 第二集，yield ？
如果 `generator`遇上 `yield`会怎样？

```javascript
var gen = function* (){
	yield 2;
	return 1;
}
var a = gen();
console.log( a.next() );
// { value: 2, done: false }
```

他并没有返回1，而是2 ，一个被 `yield`了的2 。

那么这个`done`的值，应该就是告诉我还没执行完的意思吧。

那我能不能多`next`几次？

```javascript
var a = gen();
console.log( a.next() );
// { value: 2, done: false }
console.log( a.next() );
// { value: 1, done: true }
console.log( a.next() );
// { value: undefined, done: true }
```

果然，只要`done`没返回 `true`就可以一直 `next`下去。（注：`false`也可以继续`next`，不过已经没有什么意义了 ）

**一个典型的迭代器呼之欲出 ！** 

没错，`generstor`就是一个迭代器,暂时来说和异步编程没有任何关系

```javascript
var item = null;
while( item = a.next() ){
	if(item.done === true){
		break;
	}
	// do anything with {item}
	console.log(item.value);
}

// 2 , 1
```
### 第三集，Promise  和 CO
`generator`的诞生就是为了成为一个伟大的迭代器，阴差阳错之下，被用来写异步代码。
这得从他遇上 `promise`说起。

**`generator`，或者说 `yield`有一个很特别的能力——移花接木。** 

![](http://www.lanhao.name/img/upload/yield1.png)

一个 `yield`表达式包含很丰富的操作，一行代码包含了两个阶段逻辑

- 执行最右边的操作 `2+3`，把结果通过`value`带出去。（`next`的返回值）
- 再次调用`next`时，可以接受参数，将外面的值传进来，赋值给 `a`

**君子无罪，怀璧其罪** 

这种特异功能被眼尖的程序员发现了，一个伟大的设想诞生了。

- 先将异步操作用`promise`实现，通过`yield`带出去
- 然后执行`then`函数，获取异步处理结果
- 再次执行`next`，将异步结果传回 `generator`内部，赋值给`yield`左边的表达式

![](http://www.lanhao.name/img/upload/yield2.png)

**如此一来，这一行代码看起来就像同步代码一样！** 

我们看看成品代码：

```javascript
var gen = function* () {
  let content = yield httpGet('http://www.lanhao.name');
  return content;
};

var myCo = (fn) =&gt; {
  let state = null;
  let g = fn();
  return (function next(data){
	 state = g.next(data);
	 if(state.done){
	  return state.value;
	 }else{
	  return state.value.then( val =&gt; next(val) );
	 }
 })();
};

var a = myCo(gen);

a.then(val=&gt;console.log(val));

//{"code":200,"data":[],"message":""}
```

而且我们发现，不管`generator`逻辑如何，`Co`的写法都是一样的，不会重复编码。

只要通过`Co`来执行`generator`，我们就能像同步代码一样写异步操作。

**以上就是 yield方式的异步代码 原理解释** 

（未完）
