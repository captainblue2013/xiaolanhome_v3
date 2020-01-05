

> 
无意中在网上看到 `exit`和 `die`的区别，歪果仁一言不合就讨论开了，其中不乏一些有趣的结论。

#### 官方：`exit`和 `die`是一样的
PHP Manual for exit:

```javascript
Note: This language construct is equivalent to die().
```

PHP Manual for die:

```javascript
This language construct is equivalent to exit().
```

PHP官方明确指明这两个是一样的，并且有以下佐证：

[List of Function Aliases (函数别名列表)](http://php.net/manual/en/aliases.php)，在这个列表里，`exit`是主函数，`die`是别名，PHP官方不推荐用别名，因为这有可能会在将来的版本里被干掉。（可能性不大）

另一个证据更充分，有人分析了 `parser token`， 两者解释出来都是 `T_EXIT`

意思就是，php解释这两个的时候，对应的是同一个东西。
#### 坊间，两者还是有一些区别的
- 
起源不一样

php的诞生是参考了很多语言的, 可以参考 [这里](https://exploringdata.github.io/vis/programming-languages-influence-network/#PHP)。

php主要受 `Perl`, `C`, `Python`, `C++`, `C#`, `Tcl`, `Java`, `Smalltalk`影响。

而 `exit`是来源于 `C`语言中的 exit(),`die`是来源于`Perl`中的 die 。

- 
角度刁钻，解释起来效率不一样

有一位歪果仁，没学过php，但是从脚本语言解释的角度分析了两者的区别。

大体意思就是，php被解释的时候, 一些函数、变量之类会被翻译成`TOKEN`，

如果在你的项目里 `d`开头的函数比较多，那`die`解释起来就慢，反之亦然。

我觉得这个也是有一定的道理的，至少在解释阶段确实是存在差异。

- 
从语义的角度看

也有的朋友从语义的角度分析， 

`die`是程序挂了，一般用于出错的场合：

```javascript
if( $data === false ) {
	die( "Failure." ); // something wrong
}
```

`exit`表示程序退出，一般是正常退出

```javascript
// start
// all thing done
// and exit as normal
exit(0);
```

这个观点是相当有建设性的，我一贯坚持代码首先是给人看的，

这样的区分使用是对代码可读性的很好实践。

