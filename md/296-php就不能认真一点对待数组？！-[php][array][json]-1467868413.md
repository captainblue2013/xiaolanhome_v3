

> 
php 数组，对象混搭的现象由来已久，不过小心一点也就可以了，但是有些地方，真的是坑死你不偿命

### 黑 is cheap ,show you my code
```javascript
$arr = [
    0 =&gt; 'a',
    1 =&gt; 'b',
    2 =&gt; 'c',
];
echo json_encode($arr);

// ["a","b","c"]
```

OK

没有任何问题，但是……

```javascript
$arr = [
    //0 =&gt; 'a',
    1 =&gt; 'b',
    2 =&gt; 'c',
];
echo json_encode($arr);

// {"1":"b","2":"c"}
```
## WHAT  THE FUCK!!