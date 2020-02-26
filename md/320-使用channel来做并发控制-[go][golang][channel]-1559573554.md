#### 0x00 还是同时拉取两个城市天气的问题

> 
题目具体请参考上一篇 《[使用 WaitGroup 做并发控制](http://www.lanhao.name/article/319)》

#### 0x01 这次我们直奔代码

> 
此处只展示结构，完整代码请看 [这里](https://github.com/captainblue2013/pieces-of-code)

```javascript
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type WeatherBody struct {
	WeatherInfo `json:"weatherinfo"`
}

type WeatherInfo struct {
	// 城市
	City string `json:"city"`
	// 最低温度
	Low string `json:"temp1"`
	// 最高温度
	High string `json:"temp2"`
}

// 获取天气情况的函数
func GetWeatherByCity(cityCode string) WeatherInfo {
	resp, err := http.Get("http://www.weather.com.cn/data/cityinfo/" + cityCode + ".html")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	weatherBody := WeatherBody{}

	json.Unmarshal(body, &amp;weatherBody)

	return weatherBody.WeatherInfo
}

func main() {
	// 待宰的羔羊
	cityIDS := []string{"101010100", "101270101"}
	result := []WeatherInfo{}
	// 记录任务完成的计数器
	taskCount := 0
	// 创建一个channal, 用了接受完成信号
	taskChan := make(chan bool)
	for _, cityID := range cityIDS {
		// 此处是不是很熟悉？
		id := cityID
		go func(ch chan bool) {
			weatherInfo := GetWeatherByCity(id)
			result = append(result, weatherInfo)
			// 当任务完成，向channel内发送一个信号
			taskChan &lt;- true
		}(taskChan)
	}

	for {
		// 在死循环种，这一步会阻塞，直到从channel中接收到数据
		&lt;-taskChan
		// 每次收到信号，计数器加一，直到计数器等于任务个数，跳出循环
		taskCount++
		if taskCount == len(cityIDS) {
			// 全部完成
			fmt.Printf("%+v\n", result)
			break
		}
	}
}
```
#### 主要代码讲解
1. 通过计数器`taskCount`来记录完成任务的个数
2. 通过**channel** `taskChan`来进行主线与支线的通信
3. 在一个死循环里**阻塞** 代码，直到计数器值满足要求，跳出循环
4. 打印结果

#### 0x10 提问 &amp; 练手 环节
1. 
改动上述代码，实现功能：

> 
只把最先完成的任务结果打印出来

2. 
进阶：尝试不使用 `result`这个变量，实现题目功能

