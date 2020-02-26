## 从一段代码剖释PHP foreach做了什么
当我们使用 foreach 的时候，php到底在做什么？我们看一段代码

```javascript
$arr = [ 1 , 2 , 3 ];

foreach($arr as $key =&gt; &amp;$value){
	$value *= 2;
}
// [2,4,6]

foreach($arr as $key =&gt; $value){
	echo $value;
}
// 2,4,4   why ?
```

为什么不是输出 2 , 4 , 6  ? 要解决这个谜题，我们需要搞清楚foreach到底做了什么。
以下均为伪代码：

```javascript
foreach($arr as $key =&gt; &amp;$value){
	/* 
	1.首先 php 会内部执行  
	$key = key($arr);
	$value =  &amp; current($arr); 
	注，因为上面代码使用 &amp;$value 所以此处也是引用
	*/
	$value *= 2;
}
//第一部分没有问题，正如你理解一样
//但是重点来了，这个时候 $value 仍然是 $arr 最后一个元素的引用

foreach($arr as $key = $value){
	/* 
	1.首先 php 会内部执行  
	$key = key($arr);
	$value =  current($arr); 
	注，结合上面的情况，第一循环相当于
	( $arr[2] = $arr[0] )
	所以第一循环以后，数组变成 2 , 4 , 2 ;想想为什么？
	同理，第二循环相当于 $arr[2] = $arr[1],
	数组变成 2 , 4 , 4
	第二循环相当于 $arr[2] = $arr[2],
	数组还是 2 , 4 , 4
	*/
}
```

疑难得解，那么怎么解决？

方法一，不用引用

```javascript
foreach($arr as $key =&gt; $value){
	$arr[$key] = $value * 2;
}
```

方法二，unset引用变量

```javascript
foreach($arr as $key =&gt; &amp;$value){
	$value *= 2;
}
unset($value);
```
