## PSR2 is ?
[github上一个中文介绍的项目](https://github.com/hfcorriez/fig-standards/blob/zh_CN/%E6%8E%A5%E5%8F%97/PSR-2-coding-style-guide.md)
## phpcs (php_codesniffer)
- 
Install : composer global require "squizlabs/php_codesniffer=*"

- 
PSR-1 的程式出現在 1.3.5 ，PSR-2 出現在 1.4.0 

- 
phpcs --config-set default_standard PSR2

## IDE
- 
sublime text  [参考配置](https://my.oschina.net/u/130139/blog/290638)

- 
phpstorm 

```javascript
preferences -&gt; Editor -&gt; Code Style -&gt; PHP 

-&gt; set from...(右上角) -&gt; Predefined Style -&gt; PSR1/PSR2
```

## git hook
- 安装 phpcs 

```javascript
composer global require "squizlabs/php_codesniffer=*"
```

- 
Link

```javascript
ln -s ~/.composer/vendor/bin/phpcs /usr/local/bin/phpcs
```

- 
edit hook

1.

```javascript
vi {project_root}/.git/hooks/pre-commit
```

2.

```javascript
#!/bin/sh
    PHPCS_BIN=/usr/local/bin/phpcs
    PHPCS_CODING_STANDARD=PSR2
    PHPCS_FILE_PATTERN="\.(php)$"

	FILES=$(git diff --name-only  --cached)

	if [ "$FILES" == "" ]; then
	    exit 0
	fi

	for FILE in $FILES
	do
	    echo "$FILE" | egrep -q "$PHPCS_FILE_PATTERN"
	    RETVAL=$?
	    if [ "$RETVAL" -eq "0" ]
	    then

    		PHPCS_OUTPUT=$($PHPCS_BIN --standard=$PHPCS_CODING_STANDARD $FILE)
    		PHPCS_RETVAL=$?

    		if [ $PHPCS_RETVAL -ne 0 ];
    		then
        		echo $PHPCS_OUTPUT
        		exit 1
    		fi
		fi
	done
	exit 0
```

3.

```javascript
chmod +x {project_root}/.git/hooks/pre-commit
```

- all

