
```javascript
在了解这个函数之前先来看另一个函数：__autoload。  
```

一、__autoload  

这是一个自动加载函数，在PHP5中，当我们实例化一个未定义的类时，就会触发此函数。看下面例子：  

```javascript
printit.class.php 

&lt;?php 

class PRINTIT { 

    function doPrint() {
        echo 'hello world';
    }
}
?&gt; 

index.php 

&lt;?
function __autoload( $class ) {
     $file = $class . '.class.php';  
     if ( is_file($file) ) {  
          require_once($file);  
     }
} 

$obj = new PRINTIT();
$obj-&gt;doPrint();
?&gt;
```

运行index.php后正常输出hello world。在index.php中，由于没有包含printit.class.php，在实例化printit时，自动调用__autoload函数，参数$class的值即为类名printit，此时printit.class.php就被引进来了。  

在面向对象中这种方法经常使用，可以避免书写过多的引用文件，同时也使整个系统更加灵活。  

二、splautoloadregister()  

再看splautoloadregister()，这个函数与__autoload有与曲同工之妙，看个简单的例子：  

```javascript
&lt;?
function loadprint( $class ) {
     $file = $class . '.class.php';  
     if (is_file($file)) {  
          require_once($file);  
     } 
} 

spl_autoload_register( 'loadprint' ); 

$obj = new PRINTIT();
$obj-&gt;doPrint();
?&gt;
```

将**autoload换成loadprint函数。但是loadprint不会像** autoload自动触发，这时splautoloadregister()就起作用了，它告诉PHP碰到没有定义的类就执行loadprint()。 

splautoloadregister() 调用静态方法 

```javascript
&lt;? 

class test {
     public static function loadprint( $class ) {
          $file = $class . '.class.php';  
          if (is_file($file)) {  
               require_once($file);  
          } 
     }
} 

spl_autoload_register(  array('test','loadprint')  );
//另一种写法：spl_autoload_register(  "test::loadprint"  ); 

$obj = new PRINTIT();
$obj-&gt;doPrint();
?&gt;
```
