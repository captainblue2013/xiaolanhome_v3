
服务端自不多说，通过`headers`信息即可，而在浏览器端，也是有办法的。

```javascript
var getReferrer=function() {

    var referrer = '';

    try {

        referrer = window.top.document.referrer;

    } catch(e) {

        if(window.parent) {

            try {

                referrer = window.parent.document.referrer;

            } catch(e2) {

                referrer = '';

            }

        }

    }

    if(referrer === '') {

        referrer = document.referrer;

    }

    return referrer;

};
```

单纯记录一下，记不起的时候看看
