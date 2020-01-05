
- 开始

安装

```javascript
访问ES官方网站
https://www.elastic.co/downloads/elasticsearch
获取最新版，当前本班2.1.1 。
ES对运行环境唯一要求为JAVA 1.6以上，
同样推荐官方最新版。（www.java.com）
```

配置

```javascript
ES的配置文件  ./config/elasticsearch.yml
network.host: 0.0.0.0  #地址绑定

index.number_of_shards: 10 #默认主分片个数
index.number_of_replicas: 0 #默认从分片个数
```

启动

```javascript
ES解压即用，
./bin/elasticsearch -d 

-d 参数表示在后台运行，注意ES不允许使用root用户运行，
所以你需要为ES专门分配用户，并且确保该用户对ES的数据
目录、日志目录具有写入权限。
默认数据目录在ES目录下的data
```

- 运行时

head插件

```javascript
安装方式参看
./bin/plugin install mobz/elasticsearch-head

访问地址：
http://hostname:9200/_plugin/head

head插件可以查看集群概况，删除、关闭Indices，
浏览数据，发送http请求操作数据等。
上线时注意修改ES配置不能让外部网络访问。
```

kibana

```javascript
下载地址（最新4.x变化比较大，推荐）
https://www.elastic.co/downloads/kibana

kibana也是解压即可用，直接运行即可
nohup ./bin/kibana &gt;log.txt &amp;
(由于没有 －d 参数，要用nohup保持运行)
```

kibana－marvel

```javascript
marvel是kibana的一个插件，是一个动态监控ES运行状态的工具，
安装方式请看  
https://www.elastic.co/downloads/marvel
访问地址： 
http://hostname:5601/app/marvel
```

- 集群

发现

```javascript
ES配置文件默认集群名字是elasticsearch，在同一个局域网中，
多个实例（不限主机）使用相同的集群名字，会自动发现并组成集群。
2.0版本后，使用 multicast 自动发现的用户，需要单独安装:
bin/plugin install discovery-multicast
然后配置文件加上 
discovery.zen.ping.multicast.enabled: true

ES也支持指定IP列表的集群，但灵活性和自动化不如上一种方式，
所以在具备局域网组建条件的情况下推荐使用自动发现。
```

主从

```javascript
每个运行的ES实例，称为一个节点。
当集群中运行了两个节点时（可以是单台主机上的两个节点），我们就
实现了主从功能，后启动的节点会复制一份数据，意味着磁盘空间成倍增加。
```

![](https://raw.githubusercontent.com/looly/elasticsearch-definitive-guide-cn/master/images/elas_0203.png)

第三个节点

```javascript
当有第三个节点介入时，ES集群会重新组织自己，重新分配数据分片。
数据分片（shard）是Indices存储的逻辑空间，ES以分片为单位转移数据，如图：
```

![](https://raw.githubusercontent.com/looly/elasticsearch-definitive-guide-cn/master/images/elas_0204.png)

```javascript
这样，每个节点上维护的分片减少，整个集群的吞吐量和容量都得到提升。
```

***从节点会增加搜索速度，但是降低写入效率；
而主节点能提高写入速度，轻微降低搜索速度，所以要权衡好数量** *

- 
RESTFUL 接口

ES

- 维护

分片与节点

```javascript
对于目前的应用场景，单机情况下，建议开启10个shard，0个从节点

索引方面，建议每天一个，kibana支持跨索引做局和图表，
如：log-20160105,log-20160106
```

内存与磁盘

```javascript
通过rest接口，可以删除指定的index，按时间创建index以后尤其方便删除：
curl -x delete http://hostname:9200/log-20160105

建议创建计划任务，每天固定时间删除一个月前的index
```
