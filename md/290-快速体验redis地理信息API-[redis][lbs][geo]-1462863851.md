
近日 redis 发布了3.2版本，期待已久的GEO Api终于能够使用，我们第一时间体验一下
### GEOADD

> 
GEOADD key longitude latitude member [longitude latitude member ...]

例子：

```javascript
GEOADD user_location 103.1123 30.676 "Tom"
参数讲解：
GEOADD 添加地理信息
user_location 定义一个地理信息点的集合，叫做 用户位置
103.1123  经度，X坐标
30.676  纬度，Y坐标
"Tom"   名字，用户名之类
（后3个参数作为一组信息，可以无线重复多个，一次录入多个点）
比如：
GEOADD user_location 103.1123 30.676 "Tom" 111.27 44.566 "Jack"
```

> 
注意的是，很多时候我们看到的经纬度单位 **度｜分｜秒** ，GEOADD里要转换成小数。
同时，有效的经度从-180度到180度，有效的纬度从-85.05112878度到85.05112878度。
所以，地球两极是处理不了的。

具体原因是，GEO将球形转换成平面的XY矩形，极点无法转化。
（参考 EPSG:900913 / EPSG:3785 / OSGEO:41001 ）

### GEODIST

> 
GEODIST key member1 member2 [unit]

例子：

```javascript
GEODIST user_location Jack Tom km
参数讲解：
GEODIST 计算两点距离
user_location 地理信息集合，目前只能计算同一个集合下的点
Jack Tom 两个点的名字
km 单位，m 表示米，km 表示千米，mi 表示英里，ft 表示英尺。
返回：
"1701.7446"    表示两点距离1701.74 km
```

> 
GEODIST 命令在计算距离时会假设地球为完美的球形， 在极限情况下， 这一假设最大会造成 0.5% 的误差。

### 附近的人 GEORADIUS ， GEORADIUSBYMEMBER
&gt;GEORADIUS key longitude latitude radius unit [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC]

```javascript
例子：
GEORADIUS user_location 100 35 1000 km 
表示从指定集合里，查找 （100，35）这个点附近1000km的点，
返回： Tom ，说明Jack不在1000km内。

参数说明：
user_location  指定的地理信息集合
100 35 	经纬度
1000	距离
km		距离单位，m|km|ft|mi 
以下可选开关：
WITHCOORD	返回坐标
WITHDIST	返回距离
WITHHASH	返回GeoHash
COUNT count	表示只返回多少个结果，如：COUNT 10 
ASC		按距离正序
DESC	按距离倒序

所以，假如是要获取附近1公里的人，就是
GEORADIUS user_location {X} {Y} 1 km WITHDIST ASC
```

> 
值得注意的是，使用 WITHDIST 来返回距离时，使用的单位和radius的单位是一致的，所以，尽量使用小单位，给自己更多的操作空间。

