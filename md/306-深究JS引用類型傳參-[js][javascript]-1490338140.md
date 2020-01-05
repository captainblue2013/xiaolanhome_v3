## 深究JS引用類型傳參
先看一段代碼：

```javascript
var obj = {
  name: 'Tom'
};

function foo (o) {
  o.name = 'Jack';
}

foo(obj);

console.log(obj); //{ name: 'Jack' }
```

是不是說明，在 `foo`調用的過程中， `obj`是按引用傳參的呢？

我們不妨再看一段代碼：

```javascript
var obj = {
  name: 'Tom'
};

function foo2 (o) {
  o = {
    name: 'Jack'
  };
}

foo2(obj);

console.log(obj); //{ name: 'Tom' }
```

仔細對比上面的代碼，到底參數 `o`是不是以 `obj`的引用的形式傳進去的呢？
## 解釋：
1.將一個對象賦值給一個變量的含義：

`var obj = { name: 'Tom' } ; `

這裡首先是通過 `{}`操作，建立這個對象的內存空間，然後將地址賦值給 `obj`，這個很關鍵，反復讀三遍。

2.當這個變量作為參數傳給一個函數

`foo(obj);`

正如上面所說，這個時候傳進去的，是一個對象的地址。

所以，如果我們改變 `o.name`，實際上是改變 `obj.name`,

於是最後打印出來的是  `{ name: 'Jack' }`。

**相比之下** 

在 `foo2`里，我們直接 `o = { name: 'Jack' }`操作，參考第一條解釋，我們是給“Jack”建立了新的內存空間，然後把地址賦值給 `o`， 那這個時候`o`跟`obj`的關聯的斷開了，

於是，`obj`還是原來的樣子  `{ name: 'Tom' }`
