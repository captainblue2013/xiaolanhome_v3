
支持原创请访问：[原文地址](http://wing324.github.io/2016/05/01/%E5%A6%82%E4%BD%95%E5%9C%A8MySQL%E4%B8%AD%E9%98%BB%E6%AD%A2UPDATE%E8%AF%AD%E5%8F%A5%E6%B2%A1%E6%9C%89%E6%B7%BB%E5%8A%A0WHERE%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%8F%91%E7%94%9F/)

如果在生产环境中使用UPDATE语句更新表数据，此时如果忘记携带本应该添加的WHERE条件，那么。。

Oh,no…后果可能不堪设想。。。

之前就遇到一个同事在生产环境UPDATE忘记携带WHERE条件。。
于是只能从binlog日志中找到相关数据，然后去恢复。。宝宝当时表示心好累。。。
那么有没有什么办法可以阻止这样的事情发生，又不使用任何的审核工具呢。。。
办法当然是有的，请听我说~

sql_safe_updates

sql_safe_updates这个MySQL自带的参数就可以完美的解决我们的问题，并且该参数是可以在线变更的哦~
当该参数开启的情况下，你必须要在UPDATE语句后携带WHERE条件，否则就会报出ERROR。。

举个栗子

```javascript
# sql_safe_updates=0,即未开启
root@127.0.0.1 : test 07:58:34&gt; set sql_safe_updates=0;
Query OK, 0 rows affected (0.00 sec)

root@127.0.0.1 : test 07:58:43&gt; show variables like 'sql_safe_updates';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| sql_safe_updates | OFF   |
+------------------+-------+
1 row in set (0.00 sec)

root@127.0.0.1 : test 07:58:55&gt; select * from t;
+-------+
| pd    |
+-------+
| hello |
| mysql |
+-------+
2 rows in set (0.00 sec)

root@127.0.0.1 : test 07:58:59&gt; begin;
Query OK, 0 rows affected (0.00 sec)

root@127.0.0.1 : test 07:59:04&gt; update t set pd='MySQL';
Query OK, 2 rows affected (0.00 sec)
Rows matched: 2  Changed: 2  Warnings: 0

root@127.0.0.1 : test 07:59:12&gt; select * from t;
+-------+
| pd    |
+-------+
| MySQL |
| MySQL |
+-------+
2 rows in set (0.00 sec)

# sql_safe_updates=1,即开启
root@127.0.0.1 : test 08:00:00&gt; set sql_safe_updates=1;
Query OK, 0 rows affected (0.00 sec)

root@127.0.0.1 : test 08:00:11&gt; show variables like 'sql_safe_updates';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| sql_safe_updates | ON    |
+------------------+-------+
1 row in set (0.00 sec)

root@127.0.0.1 : test 08:00:16&gt; select * from t;
+-------+
| pd    |
+-------+
| hello |
| mysql |
+-------+
2 rows in set (0.00 sec)

oot@127.0.0.1 : test 08:00:25&gt; begin;
Query OK, 0 rows affected (0.00 sec)

root@127.0.0.1 : test 08:00:27&gt; update t set pd='MySQL';
ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
```

如上属的栗子所示，当参数sql_safe_updates开启的时候，UPDATE语句不携带WHERE条件将会爆出一个错误。。所以小心使用UPDATE语句是真的很重要哇。。。
