## 1. try-catch(-final)
但凡在函数中有try－catch语句的，会导致整个函数无法优化。
    所以，应该把try－catch语句封装到一个独立的函数里。

```javascript
//不能优化
function(){
    /**
    **一些业务
    **/
    try{
        //do sth
    }catch(ex){
        //handle
    }
}

//能被优化
var foo = function(){
    try{
        //do sth
    }catch(ex){
        //handle
    }
}
function(){
    /**
    **一些业务
    **/

    foo();

}
```
## 2. with语句
with语句可以少写很多对象名，但是不值得，因为它也会导致整个函数无法优化

```javascript
function(){
    with(object1){
        name = 'tom';
    }
    /**
    * 应该写成
    * object1.name = 'tom';
    */
}
```
## 3. For-In
for-in 并不是不能优化，只是有比它效率更高的便利对象方式

```javascript
var keys = Object.keys(object1);
for (var i = 0; i &lt; keys.length; i++) {
    //do sth with object1[i]
    //这种方式会优化得很好
}
```
## 4. Yield
这个我不太了解就不说了，作为这么重要的东西，V8后续版本应该会给它做优化的吧
