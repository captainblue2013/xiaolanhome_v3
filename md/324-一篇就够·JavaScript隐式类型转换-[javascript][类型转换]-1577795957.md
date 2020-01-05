
> Javascript 隐式类型转换，**一篇就够了** ！

- [一图胜千言](#0)
- [数学算符中的类型转换](#1)

	- [减、乘、除](#11)
	- [特殊的加法](#12)
- [逻辑语句中的类型转换](#2)
	
	-  [单个变量](#21)
	-  [使用 == 比较中的5条规则](#22)
	-  [通过几个特别的题目来练习一下吧](#23)

- [附录1：类型转换表](#3)


<span id="0"></span>
### 一图胜千言

`Javascript`发生隐式类型转换时的各种猫腻，相信各位开发者已经饱受折磨。

即便是多年的 JS 老兵， 也不一定能很好地理顺这背后的规律。

接下来，本文通过几个产生**隐式类型转换**的场景，务必让你彻底掌握这个知识点。

> 提示1： 请充分注意到行文中出现的 ⭐️， 意味着这是重点句子。
> 
> 提示2： 阅读过程，可以随时翻看【附录】

![](https://lanhaooss.oss-cn-shenzhen.aliyuncs.com/images/how-it-fucking-work.png)



<span id="1"></span>
### 数学算符中的类型转换

因为JS并没有类型声明，所以任意两个变量或字面量，都可以做加减乘除。

<span id="11"></span>
#### 1. 减、乘、除
**⭐️我们在对各种非`Number`类型运用数学运算符(`- * /`)时，会先将非`Number`类型转换为`Number`类型;**

```javascript
1 - true // 0， 首先把 true 转换为数字 1， 然后执行 1 - 1
1 - null // 1,  首先把 null 转换为数字 0， 然后执行 1 - 0
1 * undefined //  NaN, undefined 转换为数字是 NaN
2 * ['5'] //  10， ['5']首先会变成 '5', 然后再变成数字 5
```
> 上面例子中的 ['5']的转换，涉及到**拆箱操作**，将来有机会再出一篇文章说明。
> 


<span id="12"></span>
#### 2.加法的特殊性
⭐️为什么加法要区别对待， 因为JS里 `+`还可以用来拼接字符串。谨记以下3条：

1. 当一侧为`String`类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
2. 当一侧为`Number`类型，另一侧为原始类型，则将原始类型转换为`Number`类型。
3. 当一侧为`Number`类型，另一侧为引用类型，将引用类型和`Number`类型转换成字符串后拼接。

> ⭐️以上3点，优先级从高到低。即 `3+'abc'` 会应用规则1，而 `3+true`会应用规则2. 

```javascript
123 + '123' // 123123   （规则1）
123 + null  // 123    （规则2）
123 + true // 124    （规则2）
123 + {}  // 123[object Object]    （规则3）
```


<span id="2"></span>
### 逻辑语句中的类型转换
当我们使用 `if` `while` `for` 语句时，我们期望表达式是一个`Boolean`，所以一定伴随着隐式类型转换。而这里面又分为两种情况：
<span id="21"></span>
#### 1.单个变量
⭐️如果只有单个变量，会先将变量转换为Boolean值。

我们可以参考**附录**的转换表来判断各种类型转变为`Boolean`后的值。

不过这里有个小技巧： 

> 只有 `null` `undefined` `''` `NaN` `0` `false` 这几个是 `false`
> 
> 其他的情况都是 `true`，比如 `{}` , `[]`

<span id="22"></span>
#### 2.使用 == 比较中的5条规则

虽然我们可以严格使用 `===`，不过了解`==`的习性还是很有必要的。

⭐️根据 `==` 两侧的数据类型，我们总结出 5 条规则：

 - 规则1：`NaN`和其他任何类型比较永远返回`false`(包括和他自己)。
 
 ```javascript
 NaN == NaN // false
 ```
 - 规则2：Boolean和其他任何类型比较，Boolean首先被转换为Number类型。
 
  ```javascript
true == 1  // true 
true == '2'  // false, 先把 true 变成 1，而不是把 '2' 变成 true
true == ['1']  // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
true == ['2']  // false, 同上
undefined == false // false ，首先 false 变成 0，然后参考规则4
null == false // false，同上
 ```
 
 - 规则3：`String`和`Number`比较，先将`String`转换为`Number`类型。

 ```javascript
 123 == '123' // true, '123' 会先变成 123
'' == 0 // true, '' 会首先变成 0
 ```

 - 规则4：`null == undefined`比较结果是`true`，除此之外，`null`、`undefined`和其他任何结果的比较值都为`false`。

	```javascript
	null == undefined // true
	null == '' // false
	null == 0 // false
	null == false // false
	undefined == '' // false
	undefined == 0 // false
	undefined == false // false
	```
	
- 规则5：`原始类型`和`引用类型`做比较时，引用类型会依照`ToPrimitive`规则转换为原始类型
	
	> ⭐️`ToPrimitive`规则，是引用类型向原始类型转变的规则，它遵循先`valueOf`后`toString`的模式期望得到一个原始类型。
	>
	> 如果还是没法得到一个原始类型，就会抛出 `TypeError`
 
	```javascript
	'[object Object]' == {} 
	// true, 对象和字符串比较，对象通过 toString 得到一个基本类型值
	'1,2,3' == [1, 2, 3] 
	// true, 同上  [1, 2, 3]通过 toString 得到一个基本类型值
	```
 	
<span id="23"></span>
#### 通过几个特别的题目来练习一下吧

##### 1.  `[] == ![]`

```
	- 第一步，![] 会变成 false
	- 第二步，应用 规则2 ，题目变成： [] == 0
	- 第三步，应用 规则5 ，[]的valueOf是0，题目变成： 0 == 0
	- 所以， 答案是 true ！// 骂人指数++
```

#### 2. `[undefined] == false`

```
	- 第一步，应用 规则5 ，[undefined]通过toString变成 '',
	  题目变成  '' == false
	- 第二步，应用 规则2 ，题目变成  '' == 0
	- 第三步，应用 规则3 ，题目变成  0 == 0
	- 所以， 答案是 true ！
	// 但是 if([undefined]) TMD又是个true ！骂人指数++
```

#### 3. 更多的题目
更多的练习，大家去生活中去发现吧。（悲惨的生活）

> ⭐️强烈建议大家去找各种奇奇怪怪的题目，反复练习上面 5 条规则，直到烂熟于心。

<span id="3"></span>
### 附录1：类型转换表
>这个表老实用了，在执行上面提到的转换规则时，可以参考这个对照表。

| 类型 | 值 | to Boolean | to Number | to String |
| --- | --- | --- | --- | --- |
| Boolean | true | true | 1 | "true" |
| Boolean | false | false | 0 | "false" |
| Number | 123 | true | 123 | "123" |
| Number | Infinity | true | Infinity | "Infinity" |
| Number | 0 | false | 0 | "0" |
| Number | NaN | false | NaN | "NaN" |
| String | "" | false | 0 | "" |
| String | "123" | true | 123 | "123" |
| String | "123abc" | true | NaN | "123abc" |
| String | "abc" | true | NaN | "abc" |
| Null | null | false | 0 | "null" |
| Undefined | undefined | fasle | NaN | "undefined" |
| Function | function(){} | true | NaN | "function(){}" |
| Object | {} | true | NaN | "[object Object]" |
| Array | [] | true | 0 | "" |
| Array | ["abc"] | true | NaN | "abc" |
| Array | ["123"] | true | 123 | "123" |
| Array | ["123", "abc"] | true | NaN | "123,abc" |