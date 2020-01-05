# Promise / deferred 分开的版本
```javascript
'use strict';
let myPromise = (deferred) =&gt; {
  this._resolved = null;
  this._rejected = null;
  this.then = (resolve,reject) =&gt; {
    switch (deferred.state){
      case 'pending':
        this._resolved = (typeof resolve === 'function') ? 
          resolve 
          : null;
        this._rejected =  (typeof reject === 'function') ? 
          reject 
          : null;
        break;
      case 'rejected':
        (typeof reject === 'function') 
        &amp;&amp; reject.call(null,deferred.reason);
        break;
      case 'resolved':
        (typeof resolve === 'function') 
        &amp;&amp; resolve.call(null,deferred.result);
        break;
    }
  };
};

let myDeferred = () =&gt; {
  let _self = this;
  this.state = 'pending';
  this.reason = null;
  this.result = null;
  this.promise = new myPromise(_self);

  this.resolved = (val) =&gt; {
    this.state = 'resolved';
    this.result = val;
    if(this.promise._resolved){
      this.promise._resolved.call(null,val);
    }
  };

  this.rejected = (err) =&gt; {
    this.state = 'rejected';
    this.reason = err;
    if(this.promise._rejected){
      this.promise._rejected.call(null,err);
    }
  };
};
```
### USAGE
```javascript
const fs = require('fs');
let getFileSync = function (path) {

  let df = new myDeferred();

  fs.readFile(path, (e, r) =&gt; {
    if(e){
 	  df.rejected(e);
    }else{
      df.resolved(r);
    }
  });
  return df.promise;
};

let r =getFileSync('./README.md');
//pending
r.then(
  //resolved
  (val) =&gt; console.log(val),

  //rejected
  (err) =&gt; console.log(err)
);
```
# 一体化的版本
```javascript
let myPromise = (fn) =&gt; {
  let _self = this;
  this.state = 'pending';
  this.result = null;
  this.reason = null;
  this.resolvedHandler = null;
  this.rejectedHandler = null;

  this.resolved = (val) =&gt; {
    _self.state = 'resolved';
    _self.result = val;
    if(typeof _self.resolvedHandler === 'function'){
      _self.resolvedHandler(val);
    }
  };

  this.rejected = (err) =&gt; {
    _self.state = 'rejected';
    _self.reason = err;

    if(typeof _self.rejectedHandler === 'function'){
      _self.rejectedHandler(err);
    }
  };

  this._promise = {};

  this._promise._p = _self;

  this._promise.then = (resolvedHandler, rejectedHandler) =&gt; {
    switch (_self.state){
      case 'pending':
    	_self.resolvedHandler = (typeof resolvedHandler === 'function') ? 
        resolvedHandler 
        : null;
    	_self.rejectedHandler = (typeof rejectedHandler === 'function') ? 
        rejectedHandler 
        : null;
    	break;

      case 'resolved':
    	(typeof resolvedHandler === 'function') 
        &amp;&amp; resolvedHandler(_self.result);
    	break;
      case 'rejected':
    	(typeof rejectedHandler === 'function') 
        &amp;&amp; rejectedHandler(_self.reason);
    }
  };

  fn(this.resolved,this.rejected);

  return this._promise;
};
```
### USAGE
```javascript
const fs = require('fs');

let getFileSync = (path) =&gt; {
  return new myPromise( (resolved, rejected) =&gt; {
    fs.readFile(path, (e, r) =&gt; {
      if(!e){
        resolved(r);
      }else{
        rejected(e);
      }
    });
  });
};

let r = getFileSync('./README.md');
//pending

r.then(
  //resolved
  (val) =&gt; console.log(val), 
  //rejected
  (err) =&gt; console.log(err)
);
```
