### 第一步
```javascript
yum install libevent
```
### 第二步
```javascript
wget http://dag.wieers.com/rpm/packages/rpmforge-release/rpmforge-release-0.3.6-1.el5.rf.i386.rpm
rpm -ivh rpmforge-release-0.3.6-1.el5.rf.i386.rpm
```
### 第三步
```javascript
yum -y install –enablerepo=rpmforge memcached php-pecl-memcache
pecl install memcache
```
### 启动
```javascript
servive memcached start
```
