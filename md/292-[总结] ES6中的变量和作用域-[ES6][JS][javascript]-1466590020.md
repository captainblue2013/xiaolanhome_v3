
[原文地址](http://www.w3cplus.com/javascript/variables-and-scoping-in-es6.html?utm_source=tuicool&amp;utm_medium=referral)
### 通过let和const确定块作用域
使用 `let`和 `const`创建块作用域，他们声明的变量只存在块内。
比如下面的示例， `let`声明的变量 `tmp`只存在于 `if`语句块，也只有在 `if`语句块内有效。

```javascript
function func () {
    if (true) {
        let tmp = 123;
    }
    console.log(tmp); // ReferenceError: tmp is not defined
}
```

相比之下，使用 `var`声明的变量，在整个函数域内都有效：

```javascript
function func () {
    if (true) {
        var tmp = 123;
    }
    console.log(tmp); // 123
}
```

块作用域也可以存在于整个函数内:

```javascript
function func () {
    let foo = 5;
    if (...) {
        let foo = 10;
        console.log(foo); // 10
    }
    console.log(foo); // 5
}
```
### const创建不可变的变量（常量）
let 创建的变量是可变的：

```javascript
let foo = "abc";
foo = "def";
console.log(foo); // def
```

而使用 `const`创建的变量是不可变量，其是一个常量：

```javascript
const foo = "abc";
foo = "def"; // TypeError
```

注意: `const`并不影响一个常数是否可变，如果一个常数是一个对象，那它总是一个引用对象，但仍然可以改变对象的本身（如果它是可变的）。

```javascript
const obj = {};
obj.prop = 123;
console.log(obj.prop); // 123
obj = {}; // TypeError
```

如果你想让 `obj`是一个真正的常数，可以使用 `freeze`方法 来冻结其值：

```javascript
const obj = Object.freeze({});
obj.prop = 123; // TypeError
```
### 循环体内的 const
一旦通过 `const`创建的变量它就是一个常量，它是不能被改变的。但这也并不意味着你不能重新给其设置一个新值。例如，可以通过一个循环来操作：

```javascript
function logArgs (...args) {
    for (let [index, elem] of args.entries()) {
        const message = index + '. ' + elem;
        console.log(message);
    }
}
logArgs("Hello", "everyon");
```

输出的结果

```javascript
0. Helloe
1. everyone
```
### 什么应该使用 let ，什么时候应该使用 const
如果你想改变一个变量保存其原始值，你就不能使用 `const`来声明：

```javascript
const foo = 1;
foo++; // TypeError
```

然而，你可以使用 `const`声明变量，来引用可变量的值：

```javascript
const bar = [];
bar.push("abc"); // array是一个可变的
```

我还在仔细考虑使用什么方式才是最好的方式，但是目前情况使用的都是像前面的示例，因为 `bar`变量是可变的。我使用 `const`表明变量和值是不可变的：

```javascript
const EMPTY_ARRAY = Object.freeze([]);
```
### 暂时性死区
使用 `let`或 `const`声明的变量有一个所谓的暂时性死区(`TDZ`)：当进入作用域范围，它就不能接受( get 或 set )访问，直到其被声明。

我们来来看一个有关于 `var`变量的生命周期，它没有暂时性死区：

- 当 `var`声明了一个变量，其就有一个存储空间（创建一个所谓的绑定）。变量就初始化了，其默认值为 `undefined`
- 当执行的范围到达声明处，变量设置为指定的值（如果有赋值的话），如果变量没有赋值，其值仍然是 `undefined`

通过 `let`声明变量存在暂时性死区，这意味着他们的生命周期如下：

- 当使用 let 创建一个变量，其就有一个块作用域，也具有一个存储空间（也就是创建一个所谓的绑定）。其值仍未初始化变量
获取或设置一个未初始化的变量，得到一个错误ReferenceError
- 当执行范围内到达声明的变量处，如果有赋值的话，变量的初始值为指定的初始化值。如果没有，变量的值仍为 undefined

使用 `const`声明的变量工作类似于 `let`，但它必须要有一个初始化值，而且不能被改变。

在一个`TDZ`内，通过 `if`语句秋设置或获取一个变量将会报错：

```javascript
if (true) { // TDZ开始
    // 未初始化tmp变量
    tmp = "abc"; // ReferenceError
    console.log(tmp); // ReferenceError
    let tmp; // TDZ结束，tmp已初始化，其初始值为undefined
    console.log(tmp); // undefined
    tmp = 123;
    console.log(tmp); // 123
}
```

下面的例子演示了死区是时间（基于时间），而不是空间（基于位置）：

```javascript
if (true) { // 进入新作用域，TDZ开始
    const func = function () {
        console.log(myVar); // OK
    }
    //在TDZ内访问myVar，会引起ReferenceError错误
    let myVar = 3; // TDZ结束
    func (); // 调用外面的TDZ
}
```
### typeof和TDZ
一个变量在难以接近TDZ时，这也意味着你不能使用 `typeof`:

```javascript
if (true) {
    console.log(typeof tmp); // ReferenceError
    let tmp;
}
```

在实践中我不认为这是一个问题，因为你不能有条的通过 `let`声明变量范围。相反，你可以使用 `var`声明变量，而且可以通过 window 创建一个全局变量：

```javascript
if (typeof myVarVariable === 'undefined') {
    // `myVarVariable` does not exist =&gt; create it
    window.myVarVariable = 'abc';
}
```
### 循环头中的 `let`
在循环中，你可以通过 `let`声明变量，为每次迭代重新绑定变量。比如在 `for`、 `for-in`和 `for-of`循环中。

看起来像下面：

```javascript
let arr = [];
for (let i = 0; i &lt; 3; i++) {
    arr.push(() = &gt; i);
}
console.log(arr.map(x =&gt; x())); // [0,1,2]
```

相比之下，使用 `var`声明的变量将在整个循环中都可以工作：

```javascript
let arr = [];
for (var i = 0; i &lt; 3; i++) {
    arr.push(() =&gt; i);
}
console.log(arr.map(x =&gt; x())); // [3,3,3]
```

每次迭代得到一个新的绑定似乎有些奇怪，但当你使用循环创建功能（比如回调事件处理），它显得就非常有用。
## 参数### 参数和局部变量
如果使用 `let`声明变量，它有一个相同的名称，称作参数。静态加载会出错：

```javascript
function func (arg) {
    let arg; // Uncaught SyntaxError: Identifier 'arg' has already been declared
}
```

同样的，将其放在一个作用块里：

```javascript
function func (arg) {
    {
        let arg; // undefined
    }
}    
```

相比之下，使用 `var`声明一个和参数相同变量，其作用范围在同一个范围内：

```javascript
function func (arg) {
    var arg;
}
```

或者

```javascript
function func (arg) {
    {
        var arg;
    }
}
```
### 参数默认值和`TDZ`
如果 参数有默认值 ，他们会当作一系列的 `let`语句，而且存在`TDZ`。

```javascript
// OK: `y` accesses `x` after it has been declared
function foo(x=1, y=x) {
    return [x, y];
}
foo(); // [1,1]

// Exception: `x` tries to access `y` within TDZ
function bar(x=y, y=2) {
    return [x, y];
}
bar(); // ReferenceError
```
### 默认参数不知道其自身的范围
参数默认值的范围是独立于其自身范围。这意味着内部定义的方法或函数参数的默认值不知道其内部的局部变量：

```javascript
let foo = 'outer';
function bar(func = x =&gt; foo) {
    let foo = 'inner';
    console.log(func()); // outer
}
bar();
```
### 全局对象
JavaScript全局对象（浏览器中的window，Node.js中的global）存在的问题比他的特性多，尤其是性能。这也是为什么ES6中不引用的原因。

全局对象的属性都是全局变量，在全局作用域下都有效，可以通过 `var`或 `function`方式声明。

但现在全局变量也不是全局对象。在全局作用域下，可以通过 `let`、 `const`或者 `class`声明。
### 函数声明和class声明
function 声明：

- 像 let 一样，声明的是一个块作用域
- 像 var 一样，在全局对象创建属性(全局作用域)
- 存在生命提升：独立于一个函数声明中提到它的范围，它总是存在于开始时创建的范围内

下面的代码演示了函数声明的提升：

```javascript
{ // Enter a new scope

    console.log(foo()); // OK, due to hoisting
    function foo() {
        return 'hello';
    }
}
```
#### 类声明：
- 是一个块作用域
- 不能在全局对象上创建属性
- 不存在生命提升

`class`不存在生命提升可能令人惊讶，那是因为其存在于引擎下，而不是一个函数。这种行为的理由是，他们扩展表达式。这些表达式在适当的时间内被执行。

```javascript
{ // Enter a new scope

    const identity = x =&gt; x;

    // Here we are in the temporal dead zone of `MyClass`
    let inst = new MyClass(); // ReferenceError

    // Note the expression in the `extends` clause
    class MyClass extends identity(Object) {
    }
}
```
