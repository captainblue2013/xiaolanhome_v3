## replace into 真的好使吗？### 关于replace into
```javascript
我们常用insert into ，你肯定也经历过，插入错误，提示duplicate key，
这就是你的表结构里包含了一个唯一键，这个时候，你可能会先删除再插入，或者
改用update，或者放弃。

其实可以试试replace。

replace的语法和insert基本一样，大部分情况下把insert 换成replace即可。
其原理是，如果插入不成功，自动删除上一条记录，然后再进行插入。
```
### 那么问题来了
```javascript
replace在它适用的场景十分方便，但是会引起一个问题。
由于是先删除后插入，如果有自增ID，也会被重新分配。
这对于一些业务系统，是不能忍受的，比如 user_id。
总不能说，更改了密码，uid都变了，其他关联表也乱了。
```
### 怎么办？
```javascript
我们有一种不改变自增ID的方法。一颗赛艇

ON DUPLICATE KEY UPDATE

insert into table1(A, B, C) values(1,2,3) 
	on duplicate key update A=1,B=2,C=3;

以上语句，就是捕获duplicate错误，然后执行update，
如此如此，就不会改变自增ID了。
```
