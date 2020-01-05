
## Show Code First

```javascript
var Promised = function (fn) {
return function () {
    var args = [];
    for(var k in arguments){
        args.push(arguments[k]);
    }
    //console.log(args);
    return new Promise(function (resolve, reject) {
        var done = function (e,r) {
            if(!e){
                resolve(r);
            }else{
                reject(e)
            }
        };
        args.push(done);
        fn.apply(this,args);
    });
}
```
## How To Use
```javascript
var getAjax = Promised(req.get);
getAjax('http://121.41.85.236:33002/beating').then(function (ret) {
    console.log(ret.body);
}).catch(function (err) {
    console.log(err);
});
```
