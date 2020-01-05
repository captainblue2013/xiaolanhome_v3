
平时我们定义一个对象，给它添加属性，通常会这样做

```javascript
var o = {};
 o.foo = function(){
    console.log('foo');
}
o.foo(); // print  'foo'
```

这是可行的，但是如果我们这样

```javascript
o.foo = null;
```

foo就被改变了，然后引起  TypeError: o.foo is not a function  的错误。
## 于是，Object.defineProperty 就进入我们视野
```javascript
var a = {};
Object.defineProperty(a,'foo',{
    value:function(){
        console.log('foo..');
    }
});
```

这样，foo就不会被改变，强行赋值（o.foo = null;）在严格模式下会出 TypeError: "foo" is read-only 错误
## 解读：
```javascript
Object.defineProperty 接受三个参数，
第一个为对象，要添加属性的对象；
第二个为属性的名字，字符串；
第三个是一个对象，是对新添加的属性的一些设置，
```

重点讲第三个参数，它有以下设置项：

```javascript
value：属性的值，可以是基本属性、对象、函数等等

writable：是否可以写，默认false，所以上面的foo是readonly

configurable：是否可以修改设置，默认false，即定义过以后是否能再次修改设置项

enumerable：是否能被枚举，关系到for in 或者 Object.keys的时候会不会被列出来

get、set：设置了get、set就不能设置 writable 或 value，不然会报错，这是对属性读写时的钩子，下面有栗子

var b = 1;
var a = {};
    Object.defineProperty(a,'foo',{
      set:function(v){
        b = v;
        console.log('set');// you can do any thing here
      },
      get:function(){
        console.log('get');  // you can do any thing here
        return b;
      }
    });
a.foo;  // print 'get' ,return 1
a.foo = 2; // print 'set' ,return 2
a.foo; //  print 'get'  ,return 2
```
## 是不是很棒？