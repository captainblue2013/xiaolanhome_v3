
1,对象属性删除

```javascript
function fun(){
   this.name = 'mm';
}

var obj = new fun();

console.log(obj.name);//mm

delete obj.name;

console.log(obj.name); //undefined
```

2,变量删除

```javascript
var name = 'lily';
delete name;
console.log(name); //lily
```

`直接用delelte删除不了变量`

3,删除不了原型链中的变量

```javascript
fun.prototype.age = 18;
delete obj.age;
console.log(obj.age) //18
```
